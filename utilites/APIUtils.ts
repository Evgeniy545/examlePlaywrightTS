import { APIRequestContext } from "playwright-core";

export default class API {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  
private async makeRequest(endpoint:string, method: string, reqBody?:object, token?: string){
    const res = await this.request[method](endpoint, {
        headers: token ? {'Authorization': 'Bearer '+token } :{},
        data: reqBody,
    });
    console.log(res);
    console.log('----------------------------');
    return res;
}

  async postReq(endpoint: string, reqBody: object, token?: string) {
    return this.makeRequest(endpoint, 'post', reqBody, token);
  }

  async getReq(endpoint: string, token?: string) {
    return this.makeRequest(endpoint, 'get', undefined, token);
  }

  async putReq(endpoint: string, reqBody: object, token: string) {
    return this.makeRequest(endpoint, 'put', reqBody, token);
  }

  async patchReq(endpoint: string, reqBody: object, token: string) {
    return this.makeRequest(endpoint, 'patch', reqBody, token);
  }

  async deleteReq(endpoint: string, token: string) {
    return this.makeRequest(endpoint, 'delete', undefined, token);
  }}