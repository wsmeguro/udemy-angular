import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable()
export class MemberService {

  membersUrl = 'api/members';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getMembers(): Promise<Member[]> {
    return this.http.get(this.membersUrl)
      .toPromise()
      .then(response => response.json().data as Member[])
      .catch(this.handleError);
    //return Promise.resolve(MEMBERS);
  }

  getMember(id: number): Promise<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Member)
      .catch(this.handleError);
    // return this.getMembers()
    //   .then(members => members.find(member => member.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  update(member: Member): Promise<Member> {
    const url = `${this.membersUrl}/${member.id}`;
    return this.http.put(url, JSON.stringify(member), { headers: this.headers })
      .toPromise()
      .then(() => member)
      .catch(this.handleError);
  }
}
