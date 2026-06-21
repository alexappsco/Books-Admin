const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const SKIP = new Set([
  "login.html",
  "forgot-password.html",
  "otp.html",
  "reset-password.html",
]);

const ACTIVE_BY_FILE = {
  "reports-analytics.html": "home",
  "books-management.html": "books",
  "publishers-management.html": "authors",
  "publisher-details.html": "authors",
  "publisher-books.html": "authors",
  "publisher-financial.html": "authors",
  "publisher-profits.html": "authors",
  "add-publisher.html": "authors",
  "edit-publisher.html": "authors",
  "articles-management.html": "articles",
  "add-article.html": "articles",
  "edit-article.html": "articles",
  "article-view.html": "articles",
  "managementemployes.html": "employees",
  "add-employes.html": "employees",
  "edit-employes.html": "employees",
  "custom-employe.html": "employees",
  "branch-management.html": "branches",
  "offers.html": "offers",
  "add-offer.html": "offers",
  "edit-offer.html": "offers",
  "packagemanagement.html": "packages",
  "add-package.html": "packages",
  "edit-package.html": "packages",
  "package-details.html": "packages",
  "buy-package.html": "packages",
  "platform-users-management.html": "users",
  "add-platform-user.html": "users",
  "subscriber-details.html": "users",
  "follower-management.html": "customers",
  "financial-management.html": "financial",
  "financial-portfolio.html": "portfolio",
  "faq-management.html": "faq",
  "paper-book-requests.html": "paper-requests",
  "book-categories.html": "categories",
  "home-layout.html": "home-layout",
  "book-ratings.html": "ratings",
  "book-details-admin.html": "ratings",
  "ads.html": "ads",
  "support.html": "support",
  "contact-us.html": "contact",
  "terms-and-conditions.html": "legal",
  "privacy-policy.html": "legal",
  "code.html": "code",
  "profile_management.html": "profile",
};

const NEW_NAV = '<nav id="sidebar-nav" class="mt-6 px-4 space-y-1"></nav>';

function migrateFile(filePath, fileName) {
  if (SKIP.has(fileName)) return { file: fileName, status: "skipped" };
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('id="sidebar"')) return { file: fileName, status: "no-sidebar" };

  const activeId = ACTIVE_BY_FILE[fileName] || "";

  // Replace sidebar nav content
  const asideMatch = html.match(/<aside[^>]*id="sidebar"[^>]*>[\s\S]*?<\/aside>/i);
  if (!asideMatch) return { file: fileName, status: "aside-not-found" };

  let aside = asideMatch[0];
  if (/<nav[\s\S]*?<\/nav>/i.test(aside)) {
    aside = aside.replace(/<nav[\s\S]*?<\/nav>/i, NEW_NAV);
  } else {
    aside = aside.replace(/>(\s*)<\/aside>/i, `>${NEW_NAV}$1</aside>`);
  }
  html = html.replace(asideMatch[0], aside);

  // Remove inline toggleSidebar if present (keep render-sidebar version)
  html = html.replace(/<script>\s*function toggleSidebar\(\)[\s\S]*?<\/script>\s*/g, (m) => {
    if (m.includes("renderSidebar")) return m;
    return "";
  });

  // Remove duplicate openLogoutModal/closeLogoutModal blocks
  html = html.replace(/<script>\s*function openLogoutModal\(\)[\s\S]*?closeLogoutModal[\s\S]*?<\/script>\s*/g, "");

  // Remove duplicate script tags before re-injecting
  html = html.replace(/\s*<script src="js\/legal-nav\.js"><\/script>\s*/g, "");
  html = html.replace(/\s*<script src="js\/render-sidebar\.js"><\/script>\s*/g, "");
  html = html.replace(/\s*<script>\s*renderSidebar\([^)]*\);\s*<\/script>\s*/g, "");

  const inject = `\n    <script src="js/legal-nav.js"></script>\n    <script src="js/render-sidebar.js"></script>\n    <script>renderSidebar('${activeId}');</script>\n`;
  html = html.replace(/<\/body>/i, `${inject}</body>`);

  // Ensure aside has id sidebar-nav target - already done

  fs.writeFileSync(filePath, html, "utf8");
  return { file: fileName, status: "updated", activeId };
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
const results = files.map((f) => migrateFile(path.join(ROOT, f), f));
console.log(JSON.stringify(results.filter((r) => r.status === "updated"), null, 2));
console.log("Total updated:", results.filter((r) => r.status === "updated").length);
