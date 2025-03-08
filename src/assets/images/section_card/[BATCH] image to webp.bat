@echo off
for %%E in (jpg jpeg png bmp gif tiff) do (
    for %%A in (*."%%E") do (
        ffmpeg -i "%%A" "%%~nA.webp"
    )
)
pause
