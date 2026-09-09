# Renders tools/og.html into public/og-image.png at 1200x630.
#
# The card is a screenshot of a real page rather than a drawing, so it inherits
# the site's fonts and gradients instead of imitating them. Chrome needs the
# network here: the Cinzel and Inter faces come from Google Fonts, and a run
# without them silently falls back to a serif that is not the brand.

param(
    [string] $Chrome,
    [string] $Out = (Join-Path $PSScriptRoot '../public/og-image.png')
)

$ErrorActionPreference = 'Stop'

if (-not $Chrome) {
    $candidates = @(
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
        "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
        "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    )
    $Chrome = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
}

if (-not $Chrome) {
    throw 'No Chrome or Edge found. Pass one with -Chrome <path to the exe>.'
}

$source = (Resolve-Path (Join-Path $PSScriptRoot 'og.html')).Path
$target = [System.IO.Path]::GetFullPath($Out)
$profile = Join-Path ([System.IO.Path]::GetTempPath()) ("og-render-" + [guid]::NewGuid())

# --virtual-time-budget holds the shot until the web fonts have loaded. Without
# it the screenshot is taken on the fallback faces often enough to notice.
& $Chrome --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
    --window-size=1200,630 --virtual-time-budget=10000 `
    --user-data-dir=$profile --screenshot=$target "file:///$($source -replace '\\', '/')" | Out-Null

Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue

if (-not (Test-Path $target)) {
    throw "Chrome produced no screenshot at $target."
}

"Wrote $target ({0:N0} bytes)" -f (Get-Item $target).Length
