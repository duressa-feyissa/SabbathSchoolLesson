import jwtDecode from "jwt-decode";
import { getJwt } from '../services/authService';
import User from "../entities/user";


const useAuth = () => {
      try {
          const jwt = getJwt();
          if(jwt) {
              return jwtDecode<User>(jwt);
          }
          return null;
      } catch(ex) {
          return null;
      }
  }

export default useAuth;
