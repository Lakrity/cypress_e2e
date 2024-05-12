import * as e2e_pokemon from "../locators/e2e_pokemon.json"
import * as data from "../helpers/default_data.json"
describe("Проверка покупки аватара", () => {
  beforeEach(() => {
    cy.visit("https://pokemonbattle.me/login");
  });


  it("[e2e] Проверка покупки аватара (успешная)", () => {
    cy.get(e2e_pokemon.email).type(data.login);
    cy.get(e2e_pokemon.password).type(data.password);
    cy.get(e2e_pokemon.show_pass_btn).should('be.visible'); // Проверка наличия кнопки "показать пароль"
    cy.get(e2e_pokemon.login_button).click();

    cy.get(e2e_pokemon.header_lavka).click();

    cy.get('.available > button').first().click();
    cy.get(e2e_pokemon.oplata_price).should('be.visible'); // Проверка того, что цена покупки отображается
    cy.get(e2e_pokemon.oplata_card_number).type("4111111111111111");
    cy.get(e2e_pokemon.oplata_card_date).type("1225");
    cy.get(e2e_pokemon.oplata_card_cvv).type("125");
    cy.get(e2e_pokemon.oplata_card_name).type("testName");
    cy.wait(1000)
    cy.get(e2e_pokemon.oplata_buy_btn).click();

    cy.get(e2e_pokemon.oplata_sms_code).type("56456");
    cy.get(e2e_pokemon.oplata_sms_send).click();

    cy.get(e2e_pokemon.oplata_accepted_title).should('be.visible');
    cy.get(e2e_pokemon.oplata_accepted_title).contains('Покупка прошла успешно');
    cy.get(e2e_pokemon.oplata_back_to_shop).click();

  });

  it("[e2e] Проверка покупки аватара (нет денег)", () => {
    cy.get(e2e_pokemon.email).type(data.login);
    cy.get(e2e_pokemon.password).type(data.password);
    cy.get(e2e_pokemon.show_pass_btn).should('be.visible'); // Проверка наличия кнопки "показать пароль"
    cy.get(e2e_pokemon.login_button).click();

    cy.get(e2e_pokemon.header_lavka).click();

    cy.get('.available > button').first().click();
    cy.get(e2e_pokemon.oplata_price).should('be.visible'); // Проверка того, что цена покупки отображается
    cy.get(e2e_pokemon.oplata_card_number).type("4111111111111111");
    cy.get(e2e_pokemon.oplata_card_date).type("1225");
    cy.get(e2e_pokemon.oplata_card_cvv).type("300");
    cy.get(e2e_pokemon.oplata_card_name).type("testName");
    cy.wait(1000)
    cy.get(e2e_pokemon.oplata_buy_btn).click();

    cy.get(e2e_pokemon.oplata_sms_code).type("56456");
    cy.get(e2e_pokemon.oplata_sms_send).click();

    cy.get(e2e_pokemon.oplata_accepted_title).should('be.visible');
    cy.get(e2e_pokemon.oplata_accepted_title).contains('Ошибка оплаты.');
    cy.get(e2e_pokemon.oplata_declined_text).contains('Недостаточно средств для оплаты. Пополните счёт или оплатите другим способом')
    cy.get(e2e_pokemon.oplata_back_to_shop).click();

  });
});
