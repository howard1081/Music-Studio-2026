$ErrorActionPreference = "Stop"

Write-Host "== Validate-Registry =="

# Load all JSONL records from 60-REGISTRY/data
$files = Get-ChildItem ".\60-REGISTRY\data\*.jsonl" -ErrorAction SilentlyContinue
if (-not $files) {
  Write-Host "SKIP: No registry .jsonl files found in .\60-REGISTRY\data (CI clean checkout)."
  exit 0
}


$allRecords = @()
foreach ($file in $files) {
  foreach ($line in Get-Content $file.FullName) {
    if ($line.Trim()) {
      try { $allRecords += ($line | ConvertFrom-Json) } catch { }
    }
  }
}

# Scoped TBD rule (ACTIVE only)
$activeTBD = 0
$historicalTBD = 0

foreach ($r in $allRecords) {
  $json = ($r | ConvertTo-Json -Compress)
  if ($json -match '"TBD"') {
    $historicalTBD++

    $isVoid = $r.record_type -match '_VOID$'
    $isOverride = $r.record_type -in @('OVERRIDE','OVERRIDE_UPDATE')

    if (-not $isVoid -and -not $isOverride) {
      if ($r.record_type -eq 'HOOK_USE') {
        $voidExists = $allRecords | Where-Object {
          $_.record_type -eq 'HOOK_USE_VOID' -and
          $_.hook_family_id -eq $r.hook_family_id -and
          $_.target_record_timestamp -eq $r.used_utc
        } | Select-Object -First 1
        if (-not $voidExists) { $activeTBD++ }
      }
      elseif ($r.record_type -eq 'SCRIPTURE_USE') {
        $voidExists = $allRecords | Where-Object {
          $_.record_type -eq 'SCRIPTURE_USE_VOID' -and
          $_.scripture_packet_id -eq $r.scripture_packet_id -and
          $_.target_record_timestamp -eq $r.used_utc
        } | Select-Object -First 1
        if (-not $voidExists) { $activeTBD++ }
      }
      elseif ($r.record_type -eq 'VERSION') {
        $activeTBD++
      }
    }
  }
}

Write-Host "ACTIVE_TBD_COUNT: $activeTBD"
Write-Host "HISTORICAL_TBD_COUNT: $historicalTBD"

if ($activeTBD -ne 0) { throw "FAIL: ACTIVE_TBD_COUNT must be 0" }

Write-Host "PASS ✅"
