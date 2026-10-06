@echo off
setlocal

set "MAX_SIZE=1920"
set "QUALITY=80"
set "PREVIEW_DIR=previews"

if not exist "%PREVIEW_DIR%" mkdir "%PREVIEW_DIR%"

for %%E in (jpg jpeg png bmp gif tif tiff) do (
    for %%A in (*.%%E) do (
        echo Generating preview for %%A...

        ffmpeg -y ^
            -i "%%A" ^
            -vf "scale='min(%MAX_SIZE%,iw)':'min(%MAX_SIZE%,ih)':force_original_aspect_ratio=decrease" ^
            -c:v libwebp ^
            -quality %QUALITY% ^
            -compression_level 6 ^
            -map_metadata -1 ^
            "%PREVIEW_DIR%\preview-%%~nA.webp"
    )
)

echo.
echo Preview generation complete.
pause