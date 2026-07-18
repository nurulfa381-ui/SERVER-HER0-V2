const missions = [
  {
    id: 1,
    title: "BOOT THE SERVER",
    description: "Install Windows Server 2019.",
    xp: 500,
    status: "available"
  },
  {
    id: 2,
    title: "CONFIGURE TCP/IP",
    description: "Assign Static IP Address.",
    xp: 600,
    status: "locked"
  },
  {
    id: 3,
    title: "INSTALL ACTIVE DIRECTORY",
    description: "Configure Active Directory Domain Services.",
    xp: 800,
    status: "locked"
  },
  {
    id: 4,
    title: "CONFIGURE DNS",
    description: "Create Forward Lookup Zone.",
    xp: 700,
    status: "locked"
  },
  {
    id: 5,
    title: "CREATE USER ACCOUNTS",
    description: "Create Organizational Units and Users.",
    xp: 700,
    status: "locked"
  },
  {
    id: 6,
    title: "PROMOTE DOMAIN CONTROLLER",
    description: "Promote Server to Domain Controller.",
    xp: 1200,
    status: "locked"
  },
  {
    id: 7,
    title: "VERIFY SERVICES",
    description: "Check AD DS and DNS Services.",
    xp: 600,
    status: "locked"
  },
  {
    id: 8,
    title: "FINAL DEPLOYMENT",
    description: "Complete Windows Server Deployment.",
    xp: 1500,
    status: "locked"
  }
];

console.log("SERVER HERO Missions Loaded", missions);
