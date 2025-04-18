const authProvider = {
    login: async ({ username, password }: { username: string; password: string }) => {
      try {
        const response = await fetch('http://localhost:5117/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
  
        // Store token & username in localStorage
        localStorage.setItem('auth', JSON.stringify({
          token: data.token,
          username,
        }));
  
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  
    logout: () => {
      localStorage.removeItem('auth');
      return Promise.resolve();
    },
  
    checkAuth: () => {
      return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
  
    checkError: (error: any) => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('auth');
        return Promise.reject();
      }
      return Promise.resolve();
    },
  
    getPermissions: () => Promise.resolve(),
  
    getIdentity: () => {
      const auth = localStorage.getItem('auth');
      if (!auth) return Promise.reject();
      const { username } = JSON.parse(auth);
      return Promise.resolve({
        id: username,
        fullName: username,
      });
    },
  };
  
  export default authProvider;
  