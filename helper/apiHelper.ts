import agent from '../helper/agentHelper';
import { reportPortalHelper } from './reportPortal';
import * as constants from '../test-data/constants'

class ApiHelpers {
    async loginCustomer(customer, params = {}) {
        return await agent
            .post(`https://api.stage-capitalix.com/auth/login`)
            .send({ ...customer, ...params })
            .set(constants.HEADER.NAME, constants.HEADER.VALUE)
            .then((res) => {
                reportPortalHelper.logInfo(`loginCustomer, ${JSON.stringify(res.body)}`)
                return res;
            })
            .catch((err) => {
                reportPortalHelper.logInfo(`loginCustomer, ${err}`)
                return err.response._body;
            });
    }

    async createCustomer(customer, params = {}) {
        return await agent
            .post(`https://api.stage-capitalix.com/customers`)
            .send({ ...customer, ...params })
            .set(constants.HEADER.NAME, constants.HEADER.VALUE)
            .then((res) => {
                reportPortalHelper.logInfo(`createCustomer, ${JSON.stringify(res.body)}`)
                return res;
            })
            .catch((err) => {
                reportPortalHelper.logInfo(`createCustomer, ${err}`)
                return err.response._body;
            });
    }
}

export const apiHelpers = new ApiHelpers();
