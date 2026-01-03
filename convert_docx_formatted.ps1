$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    $doc = $word.Documents.Open("C:\Users\howar\OneDrive\Desktop\Music GPT\Jack Mercer_Persona Bible_V2.docx")
    
    # Create directory if it doesn't exist
    $outputDir = "C:\Users\howar\CascadeProjects\Music-Studio-2026\20-ARTISTS\Jack-Mercer"
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    $outputPath = "$outputDir\ARTIST-BIBLE.md"
    $markdown = ""
    
    # Process each paragraph
    foreach ($para in $doc.Paragraphs) {
        $text = $para.Range.Text.Trim()
        
        if ($text -eq "") {
            $markdown += "`n"
            continue
        }
        
        # Check if it's a heading based on style
        $styleName = $para.Style.NameLocal
        
        if ($styleName -like "*Heading 1*" -or $styleName -like "*Title*") {
            $markdown += "# $text`n`n"
        }
        elseif ($styleName -like "*Heading 2*") {
            $markdown += "## $text`n`n"
        }
        elseif ($styleName -like "*Heading 3*") {
            $markdown += "### $text`n`n"
        }
        elseif ($styleName -like "*Heading 4*") {
            $markdown += "#### $text`n`n"
        }
        else {
            # Regular paragraph
            $markdown += "$text`n`n"
        }
    }
    
    # Save to file
    $markdown | Out-File -FilePath $outputPath -Encoding UTF8 -NoNewline
    
    $doc.Close()
    Write-Host "Conversion successful with formatting"
}
catch {
    Write-Host "Error: $_"
}
finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    Remove-Variable word
}
