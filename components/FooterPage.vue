<template>
<footer class="top-37.5 left-0 bottom-0 z-0 bg-cover w-full relative bg-linear-41/srgb from-[rgba(0,138,255,1)] to-[rgba(255,0,59,1)] before:h-0.75 before:w-full before:bg-white/10 before:block before:content-[''] text-white [&>h4]:text-2xl">
    <div class="w-[98%] max-w-[1200px] p-7.5 m-auto">
      <div class="flex flex-wrap justify-between items-start flew-row gap-4.5 relative">
        <div class="flex flex-col w-1/5 max-w-75 gap-4">
          <img
            loading="lazy"
            class="invert z-0"
            src="/img/viewingTool-logo.png"
            alt="WiiLink Mii Contest Channel Viewer Logo"
            height="60px"
          >
          <p
            class="text-white/80 mt-3.75 opacity-70 mr-2 text-left"
          >
            <Icon name="fa6-solid:globe" class="mr-1.75" />
            Site by
            <a href="https://github.com/humanoidear"
              >
              <u>Alex</u></a
            > and <a href="https://github.com/kouacc"
            ><u>kouacc</u></a>
          </p>
          <p
            class="text-white/80 -mt-2.5 opacity-70 mr-2 text-left"
          >
            <Icon name="fa6-solid:envelope-open" class="mr-2.5" />
            <a href="mailto:contact@wiilink24.com"><u>contact@wiilink24.com</u></a
            >
          </p>
          <p
            class="text-white/80 -mt-2.5 opacity-70 mr-2 text-left"
          >
            <a href="https://www.wiilink24.com" class="mr-1.25 flex flex-row items-center gap-1"
              ><img src="/img/favicon.png" alt="WiiLink Logo" class="brightness-[10000] h-5!"> WiiLink Main Site</a
            >
          </p>
        </div>
        <div class="w-full lg:w-[70%] flex flex-wrap gap-10 justify-between items-start">
          <div class="flex flex-col gap-1">
            <h4><b>Site Pages</b></h4>
            <hr
              class="w-15 border-t-2! border-t-white m-0! -translate-y-1.25"
            >
            <a href="/" class="animated-link">Home</a>
            <a href="/plaza/popular" class="animated-link">Popular</a>
            <a href="/plaza/top" class="animated-link"
              >The Top 50</a
            >
            <a href="/artisans" class="animated-link">Artisans</a
            >
            <a href="/contests/active" class="animated-link">Contests</a
            >
          </div>
          <div class="flex flex-col gap-1">
            <h4><b>GitHub Links</b></h4>
            <hr
              class="w-15 border-t-2! border-t-white m-0! -translate-y-1.25"
            >
            <a href="https://github.com/WiiLink24" class="animated-link">GitHub</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/repositories"
              class="animated-link">Repository</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/projects"
              class="animated-link">Projects</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/teams"
              class="animated-link">Teams</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/people"
              class="animated-link">People</a
            >
          </div>
          <div class="flex flex-col gap-1">
            <h4><b>Socials</b></h4>
            <hr
              class="w-15 border-t-2! border-t-white m-0! -translate-y-1.25"
            >
            <a
              href="https://discord.gg/wiilink"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="discord.gg/wiilink"
              ><Icon name="fa6-brands:discord" class="mr-2.5"/>Discord</a
            >
            <div class="hover:block">
              <a href="https://twitter.com/wiilink24" class="dropdown-toggle" data-bs-toggle="dropdown">
                <Icon name="fa6-brands:twitter" class="mr-2.5"/>Twitter
              </a>
            </div>
            <a
              href="https://github.com/WiiLink24"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="WiiLink24"
              ><Icon name="fa6-brands:github" class="mr-2.5"/>GitHub</a
            >
            <a
              href="https://www.patreon.com/WiiLink24"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="Donate!"
              ><Icon name="fa6-brands:patreon" class="mr-2.5"/>Patreon</a
            >
            <a
              href="https://www.youtube.com/@wiilink"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="WiiLink24"
              ><Icon name="fa6-brands:youtube" class="mr-2.5"/>YouTube</a
            >
          </div>
          <div class="flex flex-col gap-1">
            <h4><b>Repositories</b></h4>
            <hr
              class="w-15 border-t-2! border-t-white m-0! -translate-y-1.25"
            >
            <a
              href="https://github.com/WiiLink24/WiiLink24-Patcher"
              class="animated-link">WiiLink Patcher</a
            >
            <a
              href="https://github.com/WiiLink24/wfc-server"
              class="animated-link">WiiLink WFC</a
            >
            <a href="https://github.com/WiiLink24/web" class="animated-link"
              >Website</a
            >
            <a
              href="https://github.com/WiiLink24/food-server"
              class="animated-link">Food Channel</a
            >
            <a
              href="https://github.com/WiiLink24/room-server"
              class="animated-link">Wii Room</a
            >
          </div>
        </div>
      </div>
  
      <hr class="my-7.5! border-t-2! border-white" >
      <div class="flex flex-wrap justify-between items-start flew-row gap-4.5 relative">
        <h4 class="w-full">The WiiLink CMOC Viewing Tool is a website where you can check all Miis posted into the Check Mii Out Channel, as well as download them and view contests!
        <br><br>
        © 2020-2024 <b style="font-family:Rubik;">WiiLink</b><b style="font-family:Gilroy;">
          Team</b
        ></h4>
    </div>
  
    <div class="flex flex-col gap-2.5 lg:flex-wrap justify-between items-start lg:flex-row lg:gap-4.5 relative mt-7.5 opacity-30 transition-all duration-500 hover:opacity-100 hover:duration-500">
      <a href="https://www.wiilink24.com/tos">
        <Icon name="fa6-solid:arrow-right" class="mr-1.25"/> Terms of
        Service</a
      >
      <a href="https://www.wiilink24.com/privacy-policy"
        ><Icon name="fa6-solid:arrow-right" class="mr-1.25"/>
        Privacy Policy</a
      >
      <a href="https://www.wiilink24.com/eula"
        ><Icon name="fa6-solid:arrow-right" class="mr-1.25"/>
        End-User License Agreement (EULA)</a
      >
    </div>
  </div>
</footer>
</template>
  
  <style scoped>

    hr {
        margin-top:4px;
        opacity:20%;
        position: relative;
    }
    
  </style>
  