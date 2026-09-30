$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
try {
    $nodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $nodePath)) { $nodePath = (Get-Command node -ErrorAction Stop).Source }
    Write-Host 'Shanyraq: enter your NEW OpenAI key. It will not be saved to disk.'
    $secret = Read-Host 'API key' -AsSecureString
    $env:OPENAI_API_KEY = ([System.Net.NetworkCredential]::new('', $secret).Password -replace '\s', '')
    Remove-Variable secret
    if ([string]::IsNullOrWhiteSpace($env:OPENAI_API_KEY)) { throw 'API key is empty.' }
    Write-Host 'Open http://127.0.0.1:3100 after the server starts. Keep this window open.'
    & $nodePath (Join-Path $PSScriptRoot 'server.mjs')
} catch { Write-Host 'Startup failed. Check Node.js and enter the key again.' }
finally { Remove-Item Env:OPENAI_API_KEY -ErrorAction SilentlyContinue }
Read-Host 'Press Enter to close'
