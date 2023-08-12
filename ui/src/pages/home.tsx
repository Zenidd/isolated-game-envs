import hetznerLogo from '/hetzner.png'
import dockerLogo from '/docker.png'
import "./home.css"

export default function Home() {
    return (
        <>
        <h1> Isolated game envs</h1>
        <div>
        Cheap Minecraft and Vallheim Hosting that doesn’t skimp on quality, you just pay less for it
        </div>

        <div>
          Technologies we use:

        <div>
          <a href="https://www.docker.com/" target="_blank">
            <img src={dockerLogo} className="logo" alt="docker logo" />
          </a>
          <a href="https://www.hetzner.com/" target="_blank">
            <img src={hetznerLogo} className="logo hetzner" alt="hetzner logo" />
          </a>
        </div>
        </div>
        
        </>
      )

}