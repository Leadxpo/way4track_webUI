const hasPermission = (permission, moduleName, type = "view") => {
    try {
      const parsed = typeof permission === "string" ? JSON.parse(permission) : permission;
      return parsed.some(p => p.name === moduleName && p[type]);
    } catch (error) {
      console.error("Invalid permission format:", error);
      return false;
    }
  };
  
  export default hasPermission;
  