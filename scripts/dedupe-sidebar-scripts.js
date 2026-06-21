const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SKIP = new Set(["login.html", "forgot-password.html", "otp.html", "reset-password.html"]);

function dedupeFile(filePath, fileName) {
  if (SKIP.has(fileName)) return { file: fileName, status: "skipped" };
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('id="sidebar"')) return { file: fileName, status: "no-sidebar" };

  const before = html;
  const legalCount = (html.match(/<script src="js\/legal-nav\.js"><\/script>/g) || []).length;
  if (legalCount <= 1 && !html.match(/legal-nav\.js[\s\S]*?legal-nav\.js/)) {
    return { file: fileName, status: "ok" };
  }

  html = html.replace(/\s*<script src="js\/legal-nav\.js"><\/script>\s*/g, "");
  html = html.replace(/\s*<script src="js\/render-sidebar\.js"><\/script>\s*/g, "");
  html = html.replace(/\s*<script>\s*renderSidebar\([^)]*\);\s*<\/script>\s*/g, "");

  const activeMatch = before.match(/renderSidebar\('([^']*)'\)/);
  const activeId = activeMatch ? activeMatch[1] : "";

  const inject = `\n    <script src="js/legal-nav.js"></script>\n    <script src="js/render-sidebar.js"></script>\n    <script>renderSidebar('${activeId}');</script>\n`;
  html = html.replace(/<\/body>/i, `${inject}</body>`);

  fs.writeFileSync(filePath, html, "utf8");
  return { file: fileName, status: "fixed", activeId };
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
const results = files.map((f) => dedupeFile(path.join(ROOT, f), f));
const fixed = results.filter((r) => r.status === "fixed");
console.log(`Fixed ${fixed.length} files`);
if (fixed.length) console.log(fixed.map((r) => r.file).join(", "));
