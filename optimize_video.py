#!/usr/bin/env python3
"""
Optimize solar video using bundled ffmpeg from imageio-ffmpeg
"""
import subprocess
import sys
import os

def find_ffmpeg():
    """Find ffmpeg executable from imageio-ffmpeg"""
    try:
        import imageio_ffmpeg
        ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        return ffmpeg_exe
    except:
        return None

def optimize_video(ffmpeg_exe, input_path, output_path):
    """Upscale and optimize video using ffmpeg"""
    if not ffmpeg_exe:
        print("❌ FFmpeg not found!")
        return False
    
    print(f"🎬 Using FFmpeg: {ffmpeg_exe}")
    print(f"📁 Input: {input_path}")
    print(f"📁 Output: {output_path}")
    
    # FFmpeg command to upscale and optimize
    # -vf scale=1920:1080:flags=lanczos - Upscale to 1080p with high-quality scaling
    # -c:v libx264 - Use H.264 codec (web-compatible)
    # -crf 18 - Quality (0-51, lower is better, 18 is visually lossless)
    # -preset medium - Encoding speed/quality balance
    # -c:a aac - Audio codec
    cmd = [
        ffmpeg_exe,
        '-i', input_path,
        '-vf', 'scale=1920:1080:flags=lanczos',
        '-c:v', 'libx264',
        '-crf', '18',
        '-preset', 'medium',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-y',  # Overwrite output
        output_path
    ]
    
    print(f"⚙️  Upscaling video to 1080p and optimizing...")
    print("This may take several minutes...")
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"\n✅ Video optimization complete!")
            
            # Show file size
            original_size = os.path.getsize(input_path) / (1024 * 1024)
            new_size = os.path.getsize(output_path) / (1024 * 1024)
            print(f"📊 Size: {original_size:.2f}MB → {new_size:.2f}MB")
            return True
        else:
            print(f"❌ FFmpeg error:")
            print(result.stderr)
            return False
    except Exception as e:
        print(f"❌ Error running FFmpeg: {e}")
        return False

if __name__ == '__main__':
    ffmpeg = find_ffmpeg()
    
    if not ffmpeg:
        print("Installing imageio-ffmpeg...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'imageio-ffmpeg', '--user', '--quiet'])
        ffmpeg = find_ffmpeg()
    
    input_file = 'public/video/solarvideo.mp4'
    temp_file = 'public/video/solarvideo-opt-temp.mp4'
    
    if optimize_video(ffmpeg, input_file, temp_file):
        # Replace original with optimized
        import shutil
        shutil.move(temp_file, input_file)
        print("\n🎉 Video replaced successfully!")
    else:
        print("Failed to optimize video")
        if os.path.exists(temp_file):
            os.remove(temp_file)
