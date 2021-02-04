function value(form, field, def) {
  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}



