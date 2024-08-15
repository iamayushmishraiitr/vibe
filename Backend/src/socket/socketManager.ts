import { userData } from "./socket";

interface Userdata {
  [key: string]: string;
}

class SocketManager {
  private obj: Userdata = {};

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const map= await userData.get("online");
      this.obj = map ? JSON.parse(map) : {};     
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  }

  getUsers(): Userdata {
    return this.obj;
  }

  async setUsers(userId: string, socketId: string): Promise<void> {
    this.obj[userId] = socketId;
    try {
      await userData.set("online", JSON.stringify(this.obj));
    } catch (error) {
      console.log("Error occurred while setting user data:", error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    delete this.obj[userId];
    try {
      await userData.set("online", JSON.stringify(this.obj));
    } catch (error) {
      console.log("Error occurred while deleting user data:", error);
    }
  }
}

const manager = new SocketManager();
export default manager;
