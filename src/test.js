import Jsonbase from "./index.js";
import { readFileSync, unlinkSync } from "fs";

const db = new Jsonbase("test.json");

db.remove("");
if (readFileSync("test.json").toString() == "{}") console.log("✅ Clear Success");
else console.log("❌ Clear Failed");

db.set("a", "test");
console.log(`Test 1: ${readFileSync("test.json").toString() == '{"a":"test"}' ? "✅ Passed" : "❌ Failed"
    }`);

if (db.get("a") == "test") console.log(`Test 2: ✅ Passed`);
else console.log(`Test 2: ❌ Failed`);

db.set("b/c/d/e/f", "test");
if (db.get("b/c/d/e/f") == "test") console.log(`Test 3: ✅ Passed`);
else console.log(`Test 3: ❌ Failed`);

db.set("c/array", [1, 2, 3, 4, 5]);
if (db.get("c/array")) console.log(`Test 4: ✅ Passed`);
else console.log(`Test 4: ❌ Failed`);

if (db.get("c/array/3") == 4) console.log(`Test 5: ✅ Passed`);
else console.log(`Test 5: ❌ Failed`);

if (!db.get("c/array/5")) console.log(`Test 6: ✅ Passed`);
else console.log(`Test 6: ❌ Failed`);

db.set("c/array/5", true)
if (db.get("c/array/5")) console.log(`Test 7: ✅ Passed`);
else console.log(`Test 7: ❌ Failed`);

db.set("c/array/[]", "test")
if (db.get("c/array/[]") == "test") console.log(`Test 8: ✅ Passed`);
else console.log(`Test 8: ❌ Failed`);

db.remove("a")
if (!db.get("a")) console.log(`Test 9: ✅ Passed`);
else console.log(`Test 9: ❌ Failed`);

db.remove("c/array/[]")
db.remove("c/array/[]")
db.set("c/array/[]", "hey")
if (db.get("c/array/[]") == "hey") console.log(`Test 10: ✅ Passed`);
else console.log(`Test 10: ❌ Failed`);

unlinkSync("test.json");
