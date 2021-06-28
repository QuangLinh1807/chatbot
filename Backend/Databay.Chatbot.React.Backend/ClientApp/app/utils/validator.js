import methods from 'validator';

export default function Validator(rules, state, errors) {
    //debugger;
    errors = {};
    rules.forEach((rule) => {
        if (errors[rule.field]) return;

        const fieldValue = state[rule.field] || '';
        const args = rule.args || [];
        const validationMethod = typeof rule.method === 'string'
            ? methods[rule.method]
            : rule.method;

        if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
            errors[rule.field] = rule.message;
        }
    });
    return errors;
}



