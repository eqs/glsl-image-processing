import controlP5.*;
import processing.video.*;

ControlP5 cp5;
DropdownList cameraDropdown;
DropdownList shaderDropdown;

PShader sh;
PImage img;

Capture cam;
String[] cameraList;
String[] shaderList;

boolean recording = false;

void setup() {
  size(640, 480, P2D);
  
  cp5 = new ControlP5(this);
  
  // カメラのリストを初期化
  cameraDropdown = cp5.addDropdownList("camera list");
  cameraDropdown.setPosition(0, 0);
  cameraDropdown.setSize(width / 2, 128);
  cameraDropdown.setItemHeight(32);
  cameraDropdown.setBarHeight(32);
  
  cameraList = Capture.list();
  for (int k = 0; k < cameraList.length; k++) {
    cameraDropdown.addItem(cameraList[k], k);
  }
  
  // シェーダのリストを初期化
  shaderDropdown = cp5.addDropdownList("shader list");
  shaderDropdown.setPosition(width / 2, 0);
  shaderDropdown.setSize(width / 2, 128);
  shaderDropdown.setItemHeight(32);
  shaderDropdown.setBarHeight(32);
  
  shaderList = new File(sketchPath() + "/data").list();
  for (int k = 0; k < shaderList.length; k++) {
    shaderDropdown.addItem(shaderList[k], k);
  }
  
  // カメラの起動とシェーダの読み込み
  cam = new Capture(this, cameraList[0]);
  cam.start();
  sh = loadShader(shaderList[0]);
}

void draw() {
  drawBackground();
  
  sh.set("u_time", millis() / 1000.0);
  sh.set("u_resolution", (float)width, (float)height);
  sh.set("u_rand", random(1.0));
  sh.set("u_noise", noise(millis()));
  sh.set("u_mouse", mouseX, mouseY);
  
  if (cam.available()) {
    cam.read();
  }
  
  shader(sh);
  image(cam, 0, 0, width, height);
  resetShader();
  
  if (recording) {
    saveFrame();
  }
}

void drawBackground() {
  background(0);
  noStroke();
  fill(255);
  for (int i = 0; i < height; i += 32) {
    for (int j = 0; j < width; j += 32) {
      int ci = (i + 2 * frameCount) % height;
      int cj = (j + 5 * frameCount) % width;
      ellipse(cj, ci, 8, 8);
    }
  }
}

void controlEvent(ControlEvent e) {
  if (e.getController() == cameraDropdown) {
    int idx = (int)e.getController().getValue();
    cam.stop();
    cam = new Capture(this, cameraList[idx]);
    cam.start();
  } else if (e.getController() == shaderDropdown) {
    int idx = (int)e.getController().getValue();
    sh = loadShader(shaderList[idx]);
  }
}

void keyPressed() {
  if (key == 's') {
    recording = !recording;
    println("recording : " + recording);
  }
}
