
import methods from 'validator';
export function validRequire(value, msg) {
    if (value.length > 0) {
        return null;
    } else {
        return msg;
    }
};
export function valid_check(value) {
    if (value.length > 0)
        return null;
    else
        return 0;
};

export  function Validator(rules, state, errors) {
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