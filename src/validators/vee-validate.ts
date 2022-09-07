import { defineRule } from 'vee-validate';

defineRule<string, string[]>('required', (value, _, context) => {
  if (!value || !value.length) {
    return `O campo ${context.field} é obrigatório.`;
  }

  return true;
});

defineRule<string, string[]>('email', (value, _) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
    return 'Insira um e-mail válido.';
  }

  return true;
});

defineRule<string, string[]>('phone', (value, _) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/(\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4})/.test(value)) {
    console.log('erro');
    return 'Insira um telefone válido.';
  }

  return true;
});
