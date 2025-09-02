describe('Registro de usuarios - Escenarios positivos y negativos', () => {
  
  // --------- Generadores de datos dinámicos ---------
  const generarDNI = () => {
    return String(Math.floor(10000000 + Math.random() * 89999999)); // 8 dígitos exactos
  };

  const generarTelefono = () => {
    return String(Math.floor(1000000000 + Math.random() * 8999999999)); // 10 dígitos exactos
  };

  const generarEmail = (valido = true) => {
    const random = Math.random().toString(36).substring(7);
    return valido ? `${random}@gmail.com` : `${random}#correo.com`; // inválido
  };

  const generarPassword = (valida = true) => {
    return valida 
      ? `Aa1!${Math.random().toString(36).substring(2, 6)}` // min 8 chars con números, letras y símbolos
      : `12345`; // inválida
  };

  const generarFechaNacimiento = () => {
    const dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const anio = String(Math.floor(Math.random() * (2005 - 1970) + 1970));
    return { dia, mes, anio };
  };

  const provincias = {
    "Chaco": ["Resistencia", "Barranqueras"],
    "Buenos Aires": ["La Plata", "Mar del Plata"],
    "Córdoba": ["Córdoba Capital", "Villa María"]
  };

  const seleccionarProvinciaLocalidad = () => {
    const provs = Object.keys(provincias);
    const prov = provs[Math.floor(Math.random() * provs.length)];
    const loc = provincias[prov][Math.floor(Math.random() * provincias[prov].length)];
    return { prov, loc };
  };

  // --------- Antes de cada test ---------
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser'); // URL del formulario
  });

  // --------- Escenarios positivos ---------
  it('✅ Registro exitoso con todos los campos válidos', () => {
    const { prov, loc } = seleccionarProvinciaLocalidad();
    const { dia, mes, anio } = generarFechaNacimiento();
    const email = generarEmail(true);
    const password = generarPassword(true);

    cy.get('[data-cy="input-nombres"]').type('Juan');
    cy.get('[data-cy="input-apellido"]').type('Pérez');
    cy.get('[data-cy="input-telefono"]').type(generarTelefono());
    cy.get('[data-cy="input-dni"]').type(generarDNI());
    cy.get('[data-cy="select-provincia"]').type(prov + '{enter}');
    cy.get('[data-cy="select-localidad"]').type(loc + '{enter}');
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type(dia);
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type(mes);
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type(anio);
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type(password);
    cy.get('[data-cy="input-repetir-password"]').type(password);

    cy.get('form').submit();

    //cy.contains('Usuario creado exitosamente').should('be.visible');
  });

  it('✅ Placeholders visibles cuando los campos están vacíos', () => {
    cy.get('[data-cy="input-telefono"]').should('have.attr', 'placeholder', 'Ej: 3511234567');
    cy.get('[data-cy="input-dni"]').should('have.attr', 'placeholder', 'Ej: 12345678');
  });

  it('✅ Teléfono acepta 10 dígitos válidos', () => {
    cy.get('[data-cy="input-telefono"]').type('3511234567');
    cy.get('[data-cy="input-telefono"]').should('have.value', '3511234567');
  });

  it('✅ Fecha de nacimiento acepta formato dd/mm/aaaa', () => {
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type('15');
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type('08');
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type('1990');
  });

  // --------- Escenarios negativos ---------
  it('❌ Email inválido muestra error', () => {
    const emailInvalido = generarEmail(false);

    cy.get('[data-cy="input-email"]').type(emailInvalido);
    cy.get('[data-cy="input-confirmar-email"]').type(emailInvalido);
    cy.get('form').submit();

    cy.contains('El correo electrónico no es válido.').should('be.visible');
  });

  it('❌ Intentar enviar formulario con campos vacíos', () => {
    cy.get('form').submit();
    cy.contains('El nombre es obligatorio.').should('be.visible');
  });

  it('❌ Teléfono no debe aceptar letras', () => {
    cy.get('[data-cy="input-telefono"]').type('abcde');
    cy.get('form').submit();
    cy.contains('El número de teléfono es obligatorio').should('be.visible');
  });

  it('❌ Contraseña inválida (menos de 8 caracteres)', () => {
    cy.get('[data-cy="input-password"]').type('12345');
    cy.get('[data-cy="input-repetir-password"]').type('12345');
    cy.get('form').submit();

    cy.contains('La contraseña debe tener al menos 6 caracteres.').should('be.visible');
  });
})