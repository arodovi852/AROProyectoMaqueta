@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set MAVEN_CMD_LINE_ARGS=%*

if not exist "%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.5" (
    echo Downloading Maven wrapper...
)

"%JAVA_HOME%\bin\java" -jar "%~dp0\.mvn\wrapper\maven-wrapper.jar" %MAVEN_CMD_LINE_ARGS%

endlocal
