describe("SurveyMonkey Login E2E Test", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes(
        "Cannot read properties of null (reading 'postMessage')"
      )
    ) {
      return false;
    }
    return true;
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("MetricsTracker")) {
      return false;
    }
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("Minified React error")) {
      return false;
    }
    return true;
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      return false;
    }
    return true;
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("Maximum call stack size exceeded")) {
      return false;
    }
    return true;
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes(
        "Cannot read properties of null (reading 'cssRules')"
      )
    ) {
      return false;
    }
    return true;
  });

  it("should visit the SurveyMonkey login page and log in successfully", () => {
    cy.viewport(1500, 904);
    cy.visit("https://www.surveymonkey.com/", { timeout: 100000 });
    cy.get(".sm-linkButton-d8-0-2-4202").click();
    cy.wait(3000);
    cy.get("#username").type("sasisk@zohomail.in");
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get("#password").type("`sH633~9HV]kf", { timeout: 1000 });
    cy.get('button[type="submit"]').click();
    cy.wait(8000);
    cy.get("b").contains("Welcome");
    cy.url().should("eq", "https://www.surveymonkey.com/home/");
    cy.wait(1000);
    cy.get('[data-testid="NewSurveyButton__CreateSurveyButton"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get('[data-testid="GetStartedCardItem__Card"]').first().click();
    cy.wait(5000);
    cy.get(".title-text").should("include.text", "Untitled");
    cy.get(".title-text").click();
    cy.get("#surveyTitle").clear().type("TestFORM");
    cy.get(
      'form[id="surveyTitleForm"] a[class="wds-button wds-button--sm save"]'
    ).click();
    cy.get(".title-text").should("include.text", "TestFORM");
    //CASE -1 Add 1st checkbox question

    cy.get("#editTitle")
      .should("be.visible")
      .type("What is your favorite color?");
    cy.get("#changeQType").click();

    cy.get('.option.add-q-item[data-action="CheckboxQuestion"]').click();

    cy.get(
      'div[id="editQuestion"] section[class="t1"] a[class="wds-button wds-button--sm save"]'
    ).click();
    cy.get("span.err.overMax.hide").should(
      "contain.text",
      "You are only allowed a maximum of 200 answer choices."
    );
    cy.get('td[class="choiceText error"] span[class="err"]')
      .should("be.visible")
      .contains("You are required to have at least one choice.");

    // 1. Target the RTEs and type into the first one.
    cy.get('div[id^="newChoice"]')
      .eq(0)
      .click() // Click to focus on the RTE
      .type("red")
      .should("contain.text", "red"); // Verify the content

    // 2. Target the RTEs and type into the second one.
    cy.get('div[id^="newChoice"]')
      .eq(1)
      .click()
      .type("blue")
      .should("contain.text", "blue");

    // 3. Target the RTEs and type into the third one.
    cy.get('div[id^="newChoice"]')
      .eq(2)
      .click()
      .type("green")
      .should("contain.text", "green");

    cy.get(
      'td[class="choiceActions zero-bottom-padding"] a[title="Delete this choice."] span[class="smf-icon"]'
    ).click();

    cy.get(
      "div[id='editQuestion'] section[class='t1'] a[class='wds-button wds-button--sm save']"
    ).click();

    cy.get('[id^="question-title-"]').should(
      "contain.text",
      "What is your favorite color?"
    );

    // Add 2nd question by using the NEW QUESTION button
    cy.get(
      ".main-add-question-cta.wds-button.wds-button--primary.wds-button--icon-left"
    ).click();

    cy.get("#editTitle")
      .should("be.visible")
      .type("How satisfied are you with our product/service?");
    cy.get("#changeQType").click();
    cy.get('.option.add-q-item[data-action="MultipleChoiceQuestion"]').click();

    cy.get(
      'div[id="editQuestionContent"] div[class="category-select-container sm-input sm-input--select sm-input--sm notranslate"]'
    ).click();
    cy.get("#answerBankCategorySelect").select("2").should("have.value", "2");

    cy.get(
      'div[id="editQuestion"] section[class="t1"] a[class="wds-button wds-button--sm save"]'
    ).click();

    cy.get('div[data-qnumber="2"]').within(() => {
      cy.get("span.user-generated").should(
        "have.text",
        "How satisfied are you with our product/service?"
      );});
  });

  it("Add more questions", () => {
    cy.viewport(1500, 904);
    cy.visit("https://www.surveymonkey.com/home/"); 
    cy.contains('TestFORM').click();
    cy.contains('Edit design').click();
    cy.get("#toolbar-build-button").click(); // Click on the Build button
    cy.get(
      '.c1.cta.dta.acc_question_types.chat-mode-unsupported.ui-draggable[rel="Name"]'
    ).click();
    cy.get(
      'div[id="editQuestion"] section[class="t1"] a[class="wds-button wds-button--sm wds-button--ghost cancel"]'
    ).click();
  });
});
