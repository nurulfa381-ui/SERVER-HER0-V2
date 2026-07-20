// =======================================
// SERVER HERO PREMIUM V3.0
// missions.js
// =======================================

const missions = [

    {
        id: 1,
        title: "MISSION 01",
        subtitle: "Install Windows Server 2019",
        description:
            "Install Windows Server 2019 and prepare the operating system for server deployment.",
        xp: 250,
        coins: 50,
        gems: 2,
        difficulty: "Easy",
        duration: "20 Minutes",
        icon: "💻",
        page: "lesson1.html",
        status: "available"
    },

    {
        id: 2,
        title: "MISSION 02",
        subtitle: "Configure Static IP Address",
        description:
            "Configure a static IPv4 address, subnet mask, gateway and preferred DNS server.",
        xp: 300,
        coins: 60,
        gems: 2,
        difficulty: "Easy",
        duration: "20 Minutes",
        icon: "🌐",
        page: "lesson2.html",
        status: "locked"
    },

    {
        id: 3,
        title: "MISSION 03",
        subtitle: "Install Active Directory Domain Services",
        description:
            "Install AD DS role and promote the server as a Domain Controller.",
        xp: 450,
        coins: 75,
        gems: 3,
        difficulty: "Medium",
        duration: "30 Minutes",
        icon: "🏢",
        page: "lesson3.html",
        status: "locked"
    },

    {
        id: 4,
        title: "MISSION 04",
        subtitle: "Configure DNS Server",
        description:
            "Configure DNS zones and verify name resolution using nslookup.",
        xp: 450,
        coins: 75,
        gems: 3,
        difficulty: "Medium",
        duration: "30 Minutes",
        icon: "🛰️",
        page: "lesson4.html",
        status: "locked"
    },

    {
        id: 5,
        title: "MISSION 05",
        subtitle: "Configure DHCP Server",
        description:
            "Install DHCP Server, create a DHCP scope and activate the service.",
        xp: 500,
        coins: 90,
        gems: 4,
        difficulty: "Medium",
        duration: "35 Minutes",
        icon: "📡",
        page: "lesson5.html",
        status: "locked"
    },

    {
        id: 6,
        title: "MISSION 06",
        subtitle: "Create Organizational Unit & User",
        description:
            "Create Organizational Units (OU), users, groups and apply Active Directory management.",
        xp: 600,
        coins: 100,
        gems: 5,
        difficulty: "Hard",
        duration: "40 Minutes",
        icon: "👥",
        page: "lesson6.html",
        status: "locked"
    },

    {
        id: 7,
        title: "MISSION 07",
        subtitle: "Join Windows 10 Client to Domain",
        description:
            "Connect a Windows 10 client computer to the Active Directory domain.",
        xp: 700,
        coins: 120,
        gems: 5,
        difficulty: "Hard",
        duration: "40 Minutes",
        icon: "🖥️",
        page: "lesson7.html",
        status: "locked"
    },

    {
        id: 8,
        title: "MISSION 08",
        subtitle: "Final Server Validation",
        description:
            "Perform a complete Windows Server validation including AD DS, DNS, DHCP and client connectivity.",
        xp: 1000,
        coins: 200,
        gems: 10,
        difficulty: "Expert",
        duration: "60 Minutes",
        icon: "🏆",
        page: "lesson8.html",
        status: "locked"
    }

];

// =======================================
// TOTAL REWARD
// =======================================

const totalXP = missions.reduce((sum, mission) => sum + mission.xp, 0);

const totalCoins = missions.reduce((sum, mission) => sum + mission.coins, 0);

const totalGems = missions.reduce((sum, mission) => sum + mission.gems, 0);

// =======================================
// INFO
// =======================================

console.log("======================================");
console.log("SERVER HERO PREMIUM");
console.log("Mission Database Loaded");
console.log("Total Missions :", missions.length);
console.log("Total XP :", totalXP);
console.log("Total Coins :", totalCoins);
console.log("Total Gems :", totalGems);
console.log("======================================");

<!-- ===================================== -->
<!-- VIDEO TUTORIAL -->
<!-- ===================================== -->

<section class="card">

<h2>

<i class="fa-solid fa-circle-play"></i>

Video Tutorial

</h2>

<div class="video-container">

<iframe

src="https://www.youtube.com/embed/2t0zJk4wQk8"

title="Windows Server 2019 Installation"

allowfullscreen>

</iframe>

</div>

</section>

<!-- ===================================== -->
<!-- INSTALLATION STEPS -->
<!-- ===================================== -->

<section class="card">

<h2>

<i class="fa-solid fa-list-check"></i>

Installation Steps

</h2>

<ol class="steps">

<li>Download the Windows Server 2019 ISO image.</li>

<li>Create a bootable USB using Rufus or Ventoy.</li>

<li>Boot the computer from the USB drive.</li>

<li>Select Language, Time and Keyboard layout.</li>

<li>Click <strong>Install Now</strong>.</li>

<li>Select <strong>Windows Server 2019 Standard (Desktop Experience)</strong>.</li>

<li>Accept the license agreement.</li>

<li>Select <strong>Custom Installation</strong>.</li>

<li>Choose the installation disk.</li>

<li>Wait until Windows finishes installing.</li>

<li>Create the Administrator password.</li>

<li>Log in to Windows Server.</li>

</ol>

</section>

<!-- ===================================== -->
<!-- MINI LAB -->
<!-- ===================================== -->

<section class="card">

<h2>

<i class="fa-solid fa-flask"></i>

Mini Lab

</h2>

<p>

Complete the following practical activities.

</p>

<ul>

<li>Prepare a bootable USB installer.</li>

<li>Install Windows Server 2019.</li>

<li>Log in as Administrator.</li>

<li>Open Server Manager.</li>

<li>Verify that the installation completed successfully.</li>

</ul>

</section>

<!-- ===================================== -->
<!-- QUIZ -->
<!-- ===================================== -->

<section class="card">

<h2>

<i class="fa-solid fa-circle-question"></i>

Mission Quiz

</h2>

<p>

Which operating system is installed in Mission 01?

</p>

<div class="quiz">

<button onclick="answer(false)">

Windows 10 Pro

</button>

<button onclick="answer(true)">

Windows Server 2019

</button>

<button onclick="answer(false)">

Ubuntu Server

</button>

<button onclick="answer(false)">

Windows XP

</button>

</div>

<div

id="result"

class="result">

</div>

</section>

<!-- ===================================== -->
<!-- COMPLETE -->
<!-- ===================================== -->

<section class="card complete-card">

<h2>

<i class="fa-solid fa-award"></i>

Mission Completion

</h2>

<p>

After answering the quiz correctly, click the button below to complete Mission 01 and receive your XP reward.

</p>

<button

id="completeBtn"

onclick="completeMission()"

disabled>

Complete Mission

</button>

</section>

<!-- ===================================== -->
<!-- NAVIGATION -->
<!-- ===================================== -->

<section class="navigation">

<button

onclick="window.location.href='index.html'">

🏠 Dashboard

</button>

<button

onclick="window.location.href='lesson2.html'">

Next Mission →

</button>

</section>

</div>

<script src="lesson1.js"></script>

</body>

</html>