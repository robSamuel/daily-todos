import S from 'string';
import { v1 as uuid } from 'uuid';
import { isNumber } from 'lodash';

export class StringUtils {
    static generateUUID() {
        return uuid();
    }

    /**
     * This method returns only number
     * @param value
     * @returns {string}
     */
    static getOnlyNumbers(value) {
        const onlyNumbers = isNumber(value) ? toString(value) : value;
        return (onlyNumbers || '').replace(/[^0-9]/g, '');
    }

    static emptyIfNull(value) {
        return value ? value : '';
    }

    static isEmpty(value) {
        if (Array.isArray(value)) {
            for (const item of value) {
                if (S(item).isEmpty()) {
                    return true;
                }
            }

            return false;
        }

        return S(value).isEmpty();
    }
}
