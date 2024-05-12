import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {
    
    beforeEach ('Начало теста', function() {
        cy.visit('/'); // Зайти на сайт
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // У кнопки "Забыл пароль" правильный цвет
    });

    afterEach ('Конец теста', function(){
        cy.get(result_page.close).should('be.visible'); // Видна кнопка выхода
        cy.get(result_page.close).click(); // Нажать на кнопку выхода
    });

    it ('Верный пароль и верный логин', function(){
        
        cy.get(main_page.email).type(data.login) // Ввести имейл
        cy.get(main_page.password).type(data.password) // Ввести пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку

        cy.get(result_page.title).contains('Авторизация прошла успешно') // Информация об успешной авторизации есть
        cy.get(result_page.title).should('be.visible'); // Инфа об успешной авторизации видна
        cy.wait(2000)
    })

    it ('Верный пароль и неверный логин', function(){
       
        cy.get(main_page.email).type('неправильно@dolnikov.ru') // Ввести имейл
        cy.get(main_page.password).type(data.password) // Ввести пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации') // Информация об неуспешной авторизации есть
        cy.get(result_page.title).should('be.visible'); // Инфа об неуспешной авторизации видна
    })

    it ('Неверный пароль и верный логин', function(){
        
        cy.get(main_page.email).type(data.login) // Ввести имейл
        cy.get(main_page.password).type('12345') // Ввести пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку
        
        cy.get(result_page.title).contains('Такого логина или пароля нет') // Информация об неуспешной авторизации есть
        cy.get(result_page.title).should('be.visible'); // Инфа об неуспешной авторизации видна
    })

    it ('Проверка что в логине есть @', function(){
       
        cy.get(main_page.email).type('germandolnikov.ru') // Ввести имейл
        cy.get(main_page.password).type(data.password) // Ввести пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации') // Информация об неуспешной авторизации есть
        cy.get(result_page.title).should('be.visible'); // Инфа об неуспешной авторизации видна
    })

    it ('Проверка что можно восстановить пароль', function(){
       
        cy.get(main_page.forgot_pass_btn).click();
        cy.get(recovery_page.email).type('pochta@ya.ru')
        cy.get(recovery_page.send_button).click();

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail')
    })

    it('Проверка на приведение строчных букв', () => {
        cy.get(main_page.email).type('geRmAn@Dolnikov.ru') // Ввести имейл
        cy.get(main_page.password).type(data.password) // Ввести пароль
        cy.get(main_page.login_button).click();

        cy.get(result_page.title).contains('Авторизация прошла успешно')
    })
    
})