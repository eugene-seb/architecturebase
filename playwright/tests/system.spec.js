import { test, expect } from "@playwright/test";

test("login page", async ({ page }) => {
    await page.goto("http://localhost:3000/");
});

test("login local", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByPlaceholder("Introduce password").press("Enter");
    await page.getByRole("button", { name: "Close" }).click();
});

test("Get all books and loans", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByText("All books + new Book ISBN")).toBeVisible();
    await expect(page.getByText("All books + new Book ISBN")).toBeVisible();
});

test("Create book's form visible", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.getByRole("button", { name: "+ new Book" }).click();
    await expect(
        page.getByRole("heading", { name: "Create a new book" })
    ).toBeVisible();
    await expect(page.locator("#bModalNewBook")).toBeVisible();
    await expect(
        page.locator("#modalNewBook div").filter({ hasText: "Cancel" }).nth(2)
    ).toBeVisible();
});

test("Create a new book", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.getByRole("button", { name: "+ new Book" }).click();
    await page.getByPlaceholder("ISBN").click();
    await page.getByPlaceholder("ISBN").fill("16");
    await page.getByPlaceholder("Title").click();
    await page.getByPlaceholder("Title").fill("book 16");
    await page.getByPlaceholder("Author").click();
    await page.getByPlaceholder("Author").fill("author 16");
    await page.getByPlaceholder("Type of book").click();
    await page.getByPlaceholder("Type of book").fill("type 16");
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByText("A book has been added.").click();
    await page.getByRole("button", { name: "Close" }).click();
});

test("Add a copy", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator('[id="\\31 AddCopy"]').click();
    await expect(page.locator("#bModalAddCopy div")).toBeVisible();
    await page.locator("#nbrCopiesAdd").click();
    await page.locator("#nbrCopiesAdd").fill("1");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("books have been added.")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
});

test("remove a copy", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator('[id="\\31 RemoveCopy"]').click();
    await expect(page.locator("#bModalRemoveCopy div")).toBeVisible();
    await page.locator("#nbrCopiesRemove").click();
    await page.locator("#nbrCopiesRemove").fill("1");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("1books have been removed.")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
});

test("Create loan's form visible", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator('[id="\\31 "]').click();
    await expect(page.getByText("Select a return date: Save")).toBeVisible();
});

test("Create loan", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator('[id="\\31 "]').click();
    await expect(page.getByText("Select a return date: Save")).toBeVisible();
    await page.getByLabel("Select a return date:").click();
    await page.getByRole("cell", { name: "10" }).nth(1).click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.locator("#bModalMessage")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
});

test("return a book", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Email address: Password: Login").click();
    await page.getByPlaceholder("Introduce email").click();
    await page
        .getByPlaceholder("Introduce email")
        .fill("eugenesebastiencedricphilip.etoundi@alu.uclm.es");
    await page.getByPlaceholder("Introduce password").click();
    await page.getByPlaceholder("Introduce password").fill("1234");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(
        page.locator("#eugenesebastiencedricphilip0etoundi0alu0uclm0es1")
    ).toBeVisible();
    await page
        .locator("#eugenesebastiencedricphilip0etoundi0alu0uclm0es1")
        .click();
    await expect(page.getByText("The book has been returned.")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
});
