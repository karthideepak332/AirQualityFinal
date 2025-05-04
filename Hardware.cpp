/* ───────── Wi‑Fi & MQTT ────── */
const char* ssid       = "kong";
const char* password   = "password08";
const char* mqttServer = "test.mosquitto.org";

WiFiClient       espClient;
PubSubClient     client(espClient);

/* ───────── Pins & Objects ──── */
const int   GAS_PIN = A0;          // MQ sensor
#define      DHTPIN   D4           // GPIO‑2
#define      DHTTYPE  DHT11
#define      LED_PIN  LED_BUILTIN  // on‑board blue LED

DHT                dht(DHTPIN, DHTTYPE);
Adafruit_BMP085    bmp;
bool               bmp_ok = false;

/* ───────── Wi‑Fi ───────────── */
void setupWifi() {
  Serial.printf("\nConnecting to %s", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print('.'); }
  Serial.printf("\nWiFi connected  IP: %s\n", WiFi.localIP().toString().c_str());
}

/* ───────── MQTT ────────────── */
void mqttCallback(char*, byte*, unsigned int) { /* not used */ }

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection … ");
    char cid[32];
    snprintf(cid, sizeof(cid), "ESP8266-%06X", ESP.getChipId());
    if (client.connect(cid)) {
      Serial.println("connected");
      client.subscribe("esp8266/control");
    } else {
      Serial.printf("failed, rc=%d  -> retry in 5 s\n", client.state());
      delay(5000);
    }
  }
}

/* ───────── Setup ───────────── */
void setup() {
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);           // LED off (active‑low)

  Serial.begin(115200);
  setupWifi();

  client.setServer(mqttServer, 1883);
  client.setCallback(mqttCallback);

  dht.begin();
  bmp_ok = bmp.begin();                  // returns true if sensor answers
  Serial.println(bmp_ok ? "✅ BMP180 ready" : "❌ BMP180 not found");
}

/* ───────── Helpers ─────────── */
void pub(const char* topic, float val) {
  char buf[16];
  if (isnan(val)) strcpy(buf, "nan");
  else            dtostrf(val, 0, 1, buf);
  client.publish(topic, buf);
}

/* ───────── Main Loop ───────── */
void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  /* Gas */
  int gasRaw = analogRead(GAS_PIN);
  char buf[8];
  sprintf(buf, "%d", gasRaw);
  client.publish("esp8266/gas", buf);
  Serial.printf("Gas: %s  ", buf);

  /* DHT */
  float ht = dht.readTemperature();   // °C
  float hh = dht.readHumidity();      // %
  pub("esp8266/dht/temp", ht);
  pub("esp8266/dht/hum" , hh);
  Serial.printf("DHT‑T: %.1f  H: %.1f  ", ht, hh);

  /* BMP180 */
  float bt = NAN, bp = NAN;
  if (bmp_ok) {
    bt = bmp.readTemperature();
    bp = bmp.readPressure() / 100.0;
  }
  pub("esp8266/bmp/temp", bt);
  pub("esp8266/bmp/pres", bp);
  Serial.printf("BMP‑T: %.1f  P: %.1f\n", bt, bp);

  /* Heart‑beat blink */
  digitalWrite(LED_PIN, LOW);   delay(50);
  digitalWrite(LED_PIN, HIGH);  // LED off

  delay(2000);
}