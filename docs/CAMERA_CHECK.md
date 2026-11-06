# USB webcam prototype checks

PHASE2: basic camera checks completed2026-11-06. VGA stream and decoded1440p JPEG passed;short1440p MJPG stream delivered~15.1fps (20requested),exit0,38.9C/throttled0x0. User subsequently confirmed fan spinning and VNC access,and has now shut down/unplugged the Pi. No camera retest is currently requested. Use [current continuation](CONTINUE_ON_ANOTHER_PC.md) for deferred ADC header preparation.

The sequential instructions/results below preserve history; a statement that a test is pending at an earlier step is superseded by its later result. Output dimensions/advertised modes do not establish native sensor detail or long-run reliability.

## Step30 — identify the delivered connector

User photo shows an enclosed black webcam with mounting clip,front text `WEBCAM` and `2K QUAD HD`,and a molded USB-A plug on its cable. No manufacturer/model/electrical rating is visible. The front marking is not proof of native sensor resolution,UVC support,frame rate or power consumption. Do not assign a Waveshare model or either earlier shop listing to this unit without evidence. Price and camera budget are unchanged.

USB-A is the rectangular plug shown in the photo. The cable carries power and video data together;it does not require loose wires or a GPIO connection. UVC means USB Video Class,a standard Linux camera interface;support still needs testing on the actual device.

## Step31 — connect only this webcam

**Before the step:** keep the Pi on its stable,dry,nonconductive support,using the inspected5.1V/3A supply. Keep the current SSH session open. Leave other detector circuitry disconnected. Do not open the molded plug,splice its wires or connect it to exposed Pi pins. The camera's current rating is unknown;initial detection is a functional test,not electrical acceptance or permission to add more USB loads.

Gently plug the camera's USB-A connector into **one of the Pi4's black USB2.0 ports**. Both black ports are suitable for this first check. Use the same Pi supply and keep Pi powered for the USB connection. Match the plug's orientation;do not force it or touch the Pi's bare pins with its metal shell. If uncertain which socket is USB,ask before inserting.

The Pi4 has two USB2.0 and two USB3.0 ports;the blue USB3.0 ports are not necessary for this initial connection. See [official Pi4 product specifications](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/). The [official hardware power table](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#typical-power-requirements) lists1.2A aggregate USB peripheral current for Pi4;this is shared across its USB ports,not a measured camera draw or1.2A per port.

**Check before continuing:** user reports plug connected,and whether SSH remains responsive. A webcam LED may remain off until software opens it;its exact indicator behavior is unknown. Do not infer camera failure from an unlit LED. No connection has been confirmed yet.

## Subsequent checks — after connection confirmation

1. Check available existing Linux tools and USB device identity;no package installation assumed. Identify the camera USB vendor/product IDs and bound driver instead of trusting the front label.
2. Identify the camera's video device(s) by device linkage;do not assume every `/dev/video*` belongs to this camera or blindly select video0.
3. Query supported formats,resolutions and frame rates using an available suitable tool. USB descriptor power is a declared value,not a multimeter measurement.
4. Choose a supported modest capture mode,save a test image and inspect it before writing detector code. Commands/dependencies depend on the actual device and available tools. Obtain applicable approval before installs,sudo or writes outside the project.
5. Recheck temperature/throttling after camera use. Streaming stability,lighting,coverage and eventual smoke-detection validation are separate later tests.

No camera software,live image,UVC compatibility,resolution or frame-rate result exists at this checkpoint.


2026-11-06 result:user reports camera connected after the black-USB2-port instruction. No post-connection USB/driver/capture result yet. Next commands also check that the SSH session responds.

## Step32 — identify Linux detection and existing tools

At the **Pi SSH prompt** `sentrion@sentrion-pi`,run:

```bash
lsusb
lsusb -t
command -v v4l2-ctl
ls -l /dev/v4l/by-id/
```

These are read-only;no sudo,package installation or permission-group change is needed to attempt them.

| Command | Purpose | Expected result / what to report |
| --- | --- | --- |
| `lsusb` | Lists devices on USB,with vendor/product identifiers | Return all lines so the webcam can be separated from the Pi's USB controller/hub. A generic device name alone does not verify sensor model/resolution. |
| `lsusb -t` | Shows USB topology and attached kernel drivers | Camera video interface may show `Driver=uvcvideo`;other interfaces such as microphone can be separate. Return actual output before concluding compatibility. |
| `command -v v4l2-ctl` | Checks whether the Video4Linux inspection tool is already installed | A path means available. No printed path is a result,not permission to install it. |
| `ls -l /dev/v4l/by-id/` | Shows stable video-device links if Linux created them | Return links or exact missing-directory/error message. Do not assume all Pi `/dev/video*` nodes belong to the webcam or pick video0 blindly. |

**Check before continuing:** return all output,including command-not-found,missing-directory or connection errors. If SSH has disconnected,report that instead of unplugging power/card. Do not install packages,add sudo or replug camera automatically. Streaming,image quality,frame rate,native resolution and current draw remain untested.


2026-11-06 Step32 result:user screenshot shows USB `349c:3307 Generic HD video`,two video interfaces bound to `uvcvideo`,and two audio interfaces bound to `snd-usb-audio`. USB tree reports480M link speed;this is a bus rate,not measured video throughput or FPS. `v4l2-ctl` is already available at `/usr/bin/v4l2-ctl`. Camera by-id links for the current connection map index0 to `/dev/video0` and index1 to `/dev/video1`. USB/UVC detection PASS and SSH remains responsive. No image/audio stream has been tested. USB identity does not establish the exact sensor model or native resolution.

## Step33 — query device capabilities and advertised recording modes

At the Pi SSH prompt,run these read-only commands:

```bash
v4l2-ctl --version
v4l2-ctl --device=/dev/video0 --info
v4l2-ctl --device=/dev/video1 --info
v4l2-ctl --device=/dev/video0 --list-formats-ext
```

The version records the exact existing tool release. `--info` queries each node's capabilities so we can distinguish image capture from other node functions. One physical camera can expose multiple video-device nodes;[Linux documents metadata nodes as carrying supplementary non-image information](https://docs.kernel.org/userspace-api/media/v4l/dev-meta.html). Do not assume two nodes mean two cameras or select a node for capture until its device capabilities are returned. [Upstream v4l2-ctl manual](https://github.com/gjasny/v4l-utils/blob/master/utils/v4l2-ctl/v4l2-ctl.1.in) documents the driver-info query.

The format list should report advertised pixel formats,resolutions and supported frame intervals/FPS for the queried capture node. An advertised output mode still does not prove sensor-native resolution,achieved FPS or successful recording. If video0 is not a capture node or a query fails,return that error before changing the commands or adding sudo. Device numbers may change after reconnection.

**Check before continuing:** return all outputs;copy/paste text is useful if the format list is long. No package installation,settings change,file write or capture is performed by these queries. Choose a supported modest test mode only after reviewing results.


## Step33 results — 2026-11-06

Existing `v4l2-ctl` version **1.30.1**,`uvcvideo` driver6.18.50. Both nodes belong to the same USB camera. Use each node's **Device Caps**,rather than the combined camera capability mask:

| Node for this connection | Device capabilities | Use |
| --- | --- | --- |
| `/dev/video0` | Video Capture,Streaming,Extended Pix Format | Image capture candidate,confirmed by query |
| `/dev/video1` | Metadata Capture,Streaming,Extended Pix Format | Supplementary metadata;not the image source |

Advertised modes returned by `--list-formats-ext`:

| Format | Output size (pixels) | Advertised FPS |
| --- | --- | --- |
| MJPG | 320x240 | 30,20 |
| MJPG | 640x480 | 30,15 |
| MJPG | 1280x720 | 30,20 |
| MJPG | 1920x1080 | 30,10 |
| MJPG | 2560x1440 | 30,20 |
| YUYV | 480x320 | 25,20 |
| YUYV | 640x480 | 25,20 |
| YUYV | 800x480 | 20,15 |
| YUYV | 1280x720 | 15,10 |

MJPG means Motion-JPEG:each frame is JPEG-compressed. YUYV is an uncompressed pixel format. The camera reports2560x1440 output,consistent with its advertised Quad-HD marking,but this does not prove sensor-native resolution or achieved30fps. Actual captured image quality/coverage and stream stability are untested. No sensor model or power-draw inference is made from the format list.

## Step34 — short frame-stream test,without saving images

Keep webcam connected and Pi powered. Run at the Pi SSH prompt:

```bash
timeout 20s v4l2-ctl --device=/dev/video0 \
  --set-fmt-video=width=640,height=480,pixelformat=MJPG \
  --set-parm=30 --stream-mmap=3 --stream-skip=30 --stream-count=120
printf 'Stream exit code: %s\n' "$?"
vcgencmd get_throttled
vcgencmd measure_temp
```

The continuation backslashes mean these first three displayed lines are one command. Paste the complete block. It selects a supported low-bandwidth test mode,640x480 MJPG at a requested30frames/second. This changes the camera's runtime mode;it does not install software or change persistent settings. Memory-mapped streaming uses three in-memory buffers. Skip the first30frames as startup warm-up,then process120frames. No `--stream-to` option is supplied,so the tool's default discards data without writing an image/video file. The20second timeout bounds a stalled test;normal completion should take roughly5seconds plus startup at30fps.

[Upstream streaming help](https://github.com/gjasny/v4l-utils/blob/master/utils/v4l2-ctl/v4l2-ctl-streaming.cpp) defines the default discard behavior,buffer count and separate skipped/streamed counts. No audio is recorded. USB camera LED behavior during streaming is not an acceptance criterion by itself.

The `printf` line prints the stream command's exit status immediately afterward. Expected success is0;124 normally indicates the timeout expired. Preserve other error codes/messages rather than guessing. Progress symbols and reported FPS show whether frames arrived;return actual output before interpreting achieved rate or dropped buffers.

The last two commands repeat power/temperature checks under the new camera load. Desired flags remain `throttled=0x0`;a single short test still does not validate long-run power/cooling. No sudo or installation is needed. If permission denied,busy,unsupported option or timeout occurs,report it before changing settings/replugging.

**Check before continuing:** send full stream output,exit code,throttle flags and temperature. A successful discard test proves frame transport for this mode,not correct decoded image content,native resolution or detector performance. Next image-quality verification follows the actual result.


2026-11-06 Step34 result:requested640x480 MJPG30fps. Stream reports25.48,25.37,25.33,25.32,25.32fps and completes with exit0 before timeout. Power flags remain `throttled=0x0`,temperature38.4C. Initial frame transport PASS at about25.3fps;requested30fps was not demonstrated. No file/image was saved. Do not infer the cause of the lower reported rate from these values alone. This test does not prove decoded image content,native resolution or higher-mode stability.

## Step35 — prepare the image-quality target

Keep webcam USB connected and Pi powered. Point the webcam at a well-lit stationary object or a sheet with printed text. This gives the first snapshot recognizable detail for checking that images are real,correctly exposed and usable. Leave the lens clear;do not force or dismantle a lens ring whose function is unverified. Rest the camera securely without moving the Pi or pulling its cable.

**Check before continuing:** user confirms camera is aimed and ready. No capture yet. The next step will transfer one JPEG directly through SSH into this laptop project's ignored `tmp/` folder,avoiding an image write outside the project on the Pi. Keep the existing Pi terminal open;the capture command will be run from a separate laptop terminal after the physical readiness result. No install/sudo needed for that planned path.


2026-11-06 Step35 result:user confirms camera aimed and ready. No USB reconnection/mode change reported.

## Step36 — transfer one test JPEG directly to the laptop project

Leave the existing Pi SSH window open. Press **Ctrl+Alt+T** on Linux Mint to open a separate laptop terminal. Its prompt should be the laptop account (`hans@...`). The following command runs on the laptop because its output path belongs to this local project:

```bash
ssh -T sentrion@sentrion-pi.local \
  'timeout 20s v4l2-ctl --device=/dev/video0 --stream-mmap=3 --stream-skip=30 --stream-count=1 --stream-to=-' \
  > /home/hans/repos/cctv-smoke-detector/tmp/camera-test.jpg
```

If prompted,enter the **Pi account password**,hidden,in that terminal. No sudo or package installation. This reuses the SSH identity already accepted in Step26;do not bypass a changed-host-key warning.

The remote capture uses the current640x480 MJPG mode selected and streamed in Step34. No camera reset/replug is reported;recheck the mode if that changes. It skips30startup frames,captures one,and writes its bytes to standard output (`--stream-to=-`,which makes v4l2-ctl silent). SSH carries those bytes to the laptop. `-T` disables pseudo-terminal allocation so the binary JPEG is not treated as terminal text. Laptop `>` redirects the bytes into `tmp/camera-test.jpg`. That local folder already exists,was verified inside the project,and is ignored by Git. No remote image file is created. Do not remove the redirection and send image bytes to the terminal.

This path is machine-local;on another checkout,use its actual verified project folder. The target did not exist at preparation. If later repeated,the command replaces that temporary test image;do not use it for an image you want to preserve.

Normal completion should return the laptop prompt after startup/frame capture;it may print nothing. If SSH/capture fails,the redirected file can be empty/incomplete,so a filename alone is not proof of success. Report error text rather than retrying blindly.

**Check before continuing:** user reports command returned or gives its error. Assistant then checks the local JPEG's size/dimensions/decoding and views the actual image. Do not claim image quality/native resolution before inspection. Camera remains connected and Pi powered. No capture result/file yet.


2026-11-06 Step36 result:user reports command completed. Assistant independently verifies local `tmp/camera-test.jpg`,15944bytes,JPEG640x480 RGB,full Pillow decoding PASS. Actual image visually contains recognizable color content;basic UVC/VGA capture PASS. Framing is close and some highlights are washed out,so it is not a controlled printed-detail/scene-coverage test. No native-resolution,high-resolution streaming,exact focus-range or camera-fault conclusion follows. Image stays in ignored tmp;tracked docs retain only these technical findings.

## Step37 — prepare a stationary target for a higher-resolution check

Keep USB connected and Pi powered. Rest the webcam securely,then aim at a book,printed page or stationary object across the desk with even lighting. Keep a bright lamp/sunlight from shining directly into the lens or glaring from the target. Do not rotate/disassemble an unverified lens ring. This is a framing/lighting step,not a change to exposure controls or camera software.

**Check before continuing:** user confirms ready. Next choose a supported higher-resolution still mode and inspect the resulting image;no higher-mode command has run yet. Do not claim native sensor detail from output dimensions alone. The existing VGA image can remain in ignored tmp for comparison.


2026-11-06 Step37 follow-up:user reran capture and asked for inspection. Local file changed to14252bytes,modified12:20:24+0800;JPEG640x480 RGB and full decode PASS. New picture shows a box with cropped/close framing and soft large lettering. It is a valid new color capture,but not yet evidence of satisfactory sharpness. No known camera focus distance or lens-adjustment behavior is established.

Next comparison:place the box farther back until the whole box fits in the picture,keep camera/target stationary and evenly lit,and rerun the same Step36 laptop capture command as verification. Ask user to report once new image is saved,then inspect it. Do not change exposure/focus controls or jump to a hardware-fault diagnosis. Higher-mode/native-detail tests remain pending;image stays ignored in tmp.


2026-11-06 Step37 next result:changed local JPEG16068bytes,modified12:23:00+0800,640x480 RGB,full decode PASS. Wider scene contains recognizable distant object edges,which look clearer than the close box shot. Bright box highlights are still washed out. This is adequate framing for a higher-output-mode comparison,not a calibrated focus/detail or exposure acceptance test. Avoid endless repeats of the same VGA check.

## Step38 — capture the advertised2560x1440 output

Keep the camera's framing for comparison. In the **laptop terminal** (`hans@...`),run the following whole block:

```bash
ssh -T sentrion@sentrion-pi.local '
v4l2-ctl --device=/dev/video0 \
  --set-fmt-video=width=2560,height=1440,pixelformat=MJPG \
  --set-parm=20 >/dev/null &&
timeout 20s v4l2-ctl --device=/dev/video0 \
  --stream-mmap=3 --stream-skip=30 --stream-count=1 --stream-to=-
' > /home/hans/repos/cctv-smoke-detector/tmp/camera-1440p.jpg
```

Enter the Pi account password locally if prompted. No sudo/packages. The single-quoted block runs on the Pi. First it requests a mode that this camera advertised:2560x1440 Motion-JPEG at20fps.20fps is a supported lower-rate choice for the first high-resolution still;this command is not an achieved-FPS measurement. Mode-setting normal text is discarded to `/dev/null` so it cannot corrupt the JPEG stream;errors remain visible. `&&` starts capture only after successful settings. Then skip30startup frames and transfer one frame directly through SSH to the laptop project. No remote image file is written. This changes the camera's runtime mode;it does not alter OS configuration.

The local target is a separate ignored file,so the latest VGA image remains available for reference. Folder/path verified inside project;no existing high-resolution image at preparation. Running this command again later replaces the temporary1440p file. If the camera has been unplugged or device mapping changed,reidentify before using video0.

**Check before continuing:** user reports completion/error,then assistant verifies JPEG decoding and **actual** output dimensions and inspects the pixels. A camera can coerce a request to another size,so selecting2560x1440 alone is not a pass. Even a valid2560x1440 JPEG does not establish sensor-native resolution or sustained20/30fps. No high-resolution result exists yet. Keep Pi powered/webcam connected.


2026-11-06 Step38 result:user reports command completed and requests image display. Assistant verifies local ignored `tmp/camera-1440p.jpg`,104216bytes,modified12:26:17+0800,JPEG **2560x1440 RGB**,full Pillow decode PASS. Image visually shows recognizable scene and readable box lettering;some bright surfaces remain washed out. Actual1440p output PASS. Scene/framing/lighting differ somewhat from VGA,so this is not a calibrated sensor-resolution comparison. A valid2560x1440 JPEG alone does not prove native sensor resolution,sustained20/30fps,complete exposure quality or detector suitability.

The camera was requested to use2560x1440 MJPG at20fps;do not silently revert to another format when interpreting later results. User asked to see picture:render the local artifact directly. Both VGA and1440p files stay ignored in tmp;only these sanitized technical findings belong in tracked docs.

## Step39 — short 1440p streaming and power check (passed)

The 1440p still passed. Next check repeated frame delivery at that size. Keep the Pi powered and webcam connected. At the **Pi SSH prompt** (`sentrion@sentrion-pi:~ $`), paste the complete block:

```bash
timeout 30s v4l2-ctl --device=/dev/video0 \
  --set-fmt-video=width=2560,height=1440,pixelformat=MJPG \
  --set-parm=20 --stream-mmap=3 --stream-skip=30 --stream-count=200
printf 'Stream exit code: %s\n' "$?"
vcgencmd get_throttled
vcgencmd measure_temp
```

This explicitly selects the supported 2560×1440 Motion-JPEG mode and requests 20 frames per second. The request is not a measured rate. After skipping 30 startup frames, the tool receives 200 frames in memory and discards them; no image or video file is saved, and no audio is captured. At 20fps this takes about 12 seconds plus startup. The 30-second limit stops a stalled or slower test. No installation or sudo is needed; only the camera's runtime settings change.

**Check before continuing:** send all output, including reported FPS, the stream exit code, warning flags and temperature. Expected completion is exit code `0`; `124` means the time limit expired. Preserve any other errors for diagnosis. Desired power/temperature warning flags remain `throttled=0x0`. The temperature command reads the Pi processor temperature. See [upstream streaming help](https://github.com/gjasny/v4l-utils/blob/master/utils/v4l2-ctl/v4l2-ctl-streaming.cpp) and [Raspberry Pi vcgencmd documentation](https://www.raspberrypi.com/documentation/computers/os.html#vcgencmd).

2026-11-06 result: user screenshot shows requested20fps, reported15.28 initially and approximately15.1fps later (last15.11), stream exit0, `throttled=0x0`, temperature38.9C. Short1440p repeated frame delivery PASS;20fps was not demonstrated. No cause for the lower rate is established by this output. User also reports the Pi is already installed in its case/box with fan connected; this is the reported setup for the result, not a separately verified fan-operation or wiring test.

This short test does not establish long-run stability, measured USB current, native sensor resolution or smoke-detection performance. A later USB power descriptor check, if available without sudo, reports declared power rather than measured current. Do not repeat unchanged snapshots, install packages or adjust controls automatically.

## Step40 — identify the existing case fan

The fan is already connected according to the user. Do not install a duplicate or assign power pins from a generic diagram. Ask whether it is spinning and for a clear photo of the fan label and where its cable connects, if visible without moving or disconnecting anything. If the case hides the connection, report that first; do not open it or change wiring while powered. Record the actual fan identity, connector/pins and voltage/current evidence before accepting its electrical connection or planning other GPIO wiring. A low Pi temperature alone does not prove fan operation. This checkpoint is pending.

2026-11-06 follow-up: user confirms fan is working/spinning and asks to proceed. Mechanical operation is user-confirmed; exact power pins and electrical rating remain unknown. Continue Step41 in [BUILD_PROTOTYPE.md](BUILD_PROTOTYPE.md) by inspecting loose sensor/ADC boards without changing Pi wiring. Obtain fan connection evidence before assigning GPIO pins. No additional unchanged camera capture test is required at this checkpoint.
