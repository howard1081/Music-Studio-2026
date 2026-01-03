# Always run sanity using PowerShell 7+ if available
$pwsh = (Get-Command pwsh -ErrorAction SilentlyContinue).Source
if (-not $pwsh) {
  throw "pwsh (PowerShell 7+) not found. Install PowerShell 7 and try again."
}

& $pwsh -NoProfile -File ".\90-EXAMPLES\tools\sanity.ps1"
