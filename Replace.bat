@ECHO OFF
SETLOCAL

:: no idea what this is aimed at doing...??

for %%* in (.) do set new=%%~n*
SET new="\n"
SET old="\n\n"
for %%f in (*/*.txt) do (
    echo Processing %%f...
    (
    FOR /F "delims=" %%l IN (%%f) DO (
        SET "line=%%l"
        SETLOCAL ENABLEDELAYEDEXPANSION 
        set "x=!line:%old%=%new%!" 
        ECHO(!x!
    ENDLOCAL
    )
    )>%%~nf.new
)
GOTO :EOF