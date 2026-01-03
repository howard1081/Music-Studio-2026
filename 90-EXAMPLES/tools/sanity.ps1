param(
  [switch]$Quick
)

$ErrorActionPreference = "Stop"

Write-Host "== Music-Studio-2026 :: Sanity Run =="

# 1) Confirm PowerShell version
Write-Host "`n[1/4] PowerShell:" $PSVersionTable.PSVersion

# 2) Confirm git repo state
Write-Host "`n[2/4] Git status:"
git rev-parse --is-inside-work-tree | Out-Null
git status --porcelain
if ($LASTEXITCODE -ne 0) { throw "git status failed" }

# 3) Run registry validator if present
$validator = ".\60-REGISTRY\tools\Validate-Registry.ps1"
Write-Host "`n[3/4] Registry validator:"
if (Test-Path $validator) {
  & $validator
} else {
  Write-Host "SKIP: $validator not found"
}

# 4) Quick smoke: show latest registry counts (if jsonl exists)
Write-Host "`n[4/4] Registry file presence:"
Get-ChildItem ".\60-REGISTRY\data" -Filter "*.jsonl" -ErrorAction SilentlyContinue | Select-Object Name,Length

Write-Host "`nDONE ✅"
