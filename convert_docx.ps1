$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    $doc = $word.Documents.Open("C:\Users\howar\OneDrive\Desktop\Music GPT\Jack Mercer_Persona Bible_V2.docx")
    $content = $doc.Content.Text
    
    # Create directory if it doesn't exist
    $outputDir = "C:\Users\howar\CascadeProjects\Music-Studio-2026\20-ARTISTS\Jack-Mercer"
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    # Save to markdown file
    $content | Out-File -FilePath "$outputDir\ARTIST-BIBLE.md" -Encoding UTF8
    
    $doc.Close()
    Write-Host "Conversion successful"
}
catch {
    Write-Host "Error: $_"
}
finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    Remove-Variable word
}
