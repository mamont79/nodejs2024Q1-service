import { Injectable } from '@nestjs/common';

const db = {
  users: [],
  tracks: [],
  artists: [],
  albums: [],
  favs: {
    tracks: [],
    artists: [],
    albums: [],
  },
};

@Injectable()
export class DbService {
  get users() {
    return db.users;
  }

  get artists() {
    return db.artists;
  }

  get tracks() {
    return db.tracks;
  }

  get albums() {
    return db.albums;
  }

  get favorites() {
    return db.favs;
  }
}
