describe('Test Registro Web', () => {


  beforeEach(() => {
   cy.visit('https://ticketazo.com.ar/auth/registerUser');
  });


  it('Ya existe un usuario registrado con ese DNI', () => {
   
    cy.get('[data-cy="input-nombres"]').clear().type('daniel');
    cy.get('[data-cy="input-apellido"]').clear().type('diaz');
    cy.get('[data-cy="input-telefono"]').clear().type('3109292456');
    cy.get('[data-cy="input-dni"]').clear().type('34849937');
    cy.get('[data-cy="select-provincia"]').clear().type('Chaco{enter}');
    cy.get('[data-cy="select-localidad"]').clear().type('Charata{enter}');
    cy.contains('dd').type('17');
    cy.contains('mm').type('10');
    cy.contains('aaaa').type('1981');
    cy.wait(1000)
    cy.get('[data-cy="input-email"]').clear().type('daniel@gmail.com');
    cy.get('[data-cy="input-confirmar-email"]').clear().type('daniel@gmail.com');
    cy.get('[data-cy="input-password"]').clear().type('D@ni1710');
    cy.get('[data-cy="input-repetir-password"]').clear().type('D@ni1710');
    cy.get('[data-cy="btn-registrarse"]').click()
    cy.wait(2000)
  })

   it('Ya existe un usuario con este nombre', () => {
   
    cy.get('[data-cy="input-nombres"]').clear().type('daniel');
    cy.get('[data-cy="input-apellido"]').clear().type('diaz');
    cy.get('[data-cy="input-telefono"]').clear().type('3109292456');
    cy.get('[data-cy="input-dni"]').clear().type('34849940');
    cy.get('[data-cy="select-provincia"]').clear().type('Chaco{enter}');
    cy.get('[data-cy="select-localidad"]').clear().type('Charata{enter}');
    cy.contains('dd').type('17');
    cy.contains('mm').type('10');
    cy.contains('aaaa').type('1981');
    cy.wait(1000)
    cy.get('[data-cy="input-email"]').clear().type('daniel@gmail.com');
    cy.get('[data-cy="input-confirmar-email"]').clear().type('daniel@gmail.com');
    cy.get('[data-cy="input-password"]').clear().type('D@ni1710');
    cy.get('[data-cy="input-repetir-password"]').clear().type('D@ni1710');
    cy.get('[data-cy="btn-registrarse"]').click()
    cy.wait(2000)
  })
})