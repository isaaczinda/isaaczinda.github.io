gci "C:\Users\SAAS Student\Documents\GitHub\isaaczinda.github.io\French\database" *.config -recurse | ForEach {
  (Get-Content $_ | ForEach {$_ -replace "\n\n", "\n"}) | Set-Content $_ 
}