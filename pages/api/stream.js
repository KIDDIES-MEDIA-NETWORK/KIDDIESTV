import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { streamKey, route } = req.body;

    // FFmpeg command
    const ffmpegCmd = `ffmpeg -i rtmp://fms-03-01.5centscdn.com/${route}/${streamKey} -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -g 50 -c:a aac -b:a 160k -ac 2 -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments ${path.join(process.cwd(), 'public/streams/index.m3u8')}`;

    // Run FFmpeg command
    exec(ffmpegCmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Error running FFmpeg command' });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);
      res.status(200).json({ message: 'Streaming started' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
