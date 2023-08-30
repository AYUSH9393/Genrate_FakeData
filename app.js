const generateBtn = document.getElementById('generateBtn');
const usersContainer = document.getElementById('users');

const getRandomCountry = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        return countriesData[randomIndex].name.common;
    } catch (error) {
        console.error('Error fetching country data:', error);
        return 'Unknown';
    }
};

generateBtn.addEventListener('click', async () => {
    const country = await getRandomCountry();

    fetch('https://fakerapi.it/api/v1/persons?_quantity=3')
        .then(response => response.json())
        .then(data => {
            usersContainer.innerHTML = '';

            data.data.forEach(user => {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
                userElement.innerHTML = `
                    <h3>${user.first_name} ${user.last_name}</h3>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Country: ${country}</p>
                `;
                usersContainer.appendChild(userElement);
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
});
//jaahhha
