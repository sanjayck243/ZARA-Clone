document.addEventListener('DOMContentLoaded', function() {
    const foodDatabase = {
        'Dosa': { calories: 133, carbs: 18, protein: 3, fat: 5 },
        'Idli': { calories: 39, carbs: 8, protein: 2, fat: 1 },
        'Paneer': { calories: 265, carbs: 6, protein: 18, fat: 20 },
        'Samosa': { calories: 262, carbs: 31, protein: 6, fat: 12 },
        'Chole': { calories: 269, carbs: 45, protein: 14, fat: 5 },
        'Bhindi Masala': { calories: 112, carbs: 11, protein: 3, fat: 7 },
        'Butter Chicken': { calories: 300, carbs: 9, protein: 25, fat: 20 },
        'Aloo Gobi': { calories: 132, carbs: 18, protein: 3, fat: 6 },
        'Raita': { calories: 50, carbs: 5, protein: 2, fat: 2 },
        'Pani Puri': { calories: 55, carbs: 10, protein: 1, fat: 2 },
        'Biryani': { calories: 210, carbs: 28, protein: 6, fat: 8 },
        'Rogan Josh': { calories: 345, carbs: 11, protein: 29, fat: 22 },
        'Palak Paneer': { calories: 244, carbs: 14, protein: 16, fat: 15 },
        'Rajma': { calories: 143, carbs: 23, protein: 9, fat: 0.9 },
        'Pulao': { calories: 190, carbs: 37, protein: 4, fat: 4 },
        'Dal Makhani': { calories: 227, carbs: 34, protein: 13, fat: 8 },
        'Aloo Paratha': { calories: 297, carbs: 35, protein: 7, fat: 14 },
        'Naan': { calories: 260, carbs: 40, protein: 7, fat: 7 },
        'Pesarattu': { calories: 200, carbs: 30, protein: 8, fat: 6 },
        'Hyderabadi Biryani': { calories: 275, carbs: 38, protein: 12, fat: 10 },
        'Kachori': { calories: 236, carbs: 31, protein: 5, fat: 11 },
        'Pakora': { calories: 120, carbs: 16, protein: 2, fat: 6 },
        'Methi Thepla': { calories: 150, carbs: 23, protein: 5, fat: 5 },
        'Khichdi': { calories: 190, carbs: 30, protein: 7, fat: 6 },
        'Dhokla': { calories: 120, carbs: 20, protein: 4, fat: 2 },
        'Gulab Jamun': { calories: 150, carbs: 20, protein: 2, fat: 8 },
        'Jalebi': { calories: 170, carbs: 38, protein: 2, fat: 5 },
        'Lassi': { calories: 150, carbs: 20, protein: 5, fat: 5 },
        'Prawn Masala': { calories: 250, carbs: 10, protein: 30, fat: 10 },
        'Tandoori Chicken': { calories: 200, carbs: 0, protein: 30, fat: 8 },
        'Korma': { calories: 295, carbs: 12, protein: 20, fat: 20 },
        'Chana Masala': { calories: 220, carbs: 35, protein: 12, fat: 5 },
        'Paneer Tikka': { calories: 270, carbs: 5, protein: 20, fat: 20 },
        'Baingan Bharta': { calories: 130, carbs: 14, protein: 3, fat: 8 },
        'Pav Bhaji': { calories: 250, carbs: 38, protein: 6, fat: 10 },
        'Vada Pav': { calories: 250, carbs: 35, protein: 6, fat: 12 },
        'Bhel Puri': { calories: 150, carbs: 27, protein: 2, fat: 4 },
        'Aloo Tikki': { calories: 180, carbs: 28, protein: 4, fat: 7 },
        'Mutton Curry': { calories: 350, carbs: 10, protein: 30, fat: 20 },
        'Dal Tadka': { calories: 240, carbs: 35, protein: 13, fat: 9 },
        'Methi Paratha': { calories: 200, carbs: 30, protein: 5, fat: 8 },
        'Sambar': { calories: 130, carbs: 20, protein: 5, fat: 5 },
        'Pongal': { calories: 260, carbs: 45, protein: 6, fat: 8 },
        'Rasam': { calories: 90, carbs: 14, protein: 3, fat: 2 },
        'Chappati': { calories: 120, carbs: 24, protein: 3, fat: 1 },
        'Vegetable Korma': { calories: 200, carbs: 18, protein: 5, fat: 12 },
        'Butter Naan': { calories: 290, carbs: 46, protein: 8, fat: 9 },
        'Chole Bhature': { calories: 300, carbs: 40, protein: 10, fat: 15 },
        'Rajma Chawal': { calories: 400, carbs: 70, protein: 14, fat: 8 },
        'Puri': { calories: 130, carbs: 16, protein: 3, fat: 6 },
        'Tikki': { calories: 180, carbs: 25, protein: 5, fat: 8 }
    };

    const mealLogs = {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
    };

    const macroTotals = { calories: 0, carbs: 0, protein: 0, fat: 0 };

    document.querySelectorAll('.add-food').forEach(button => {
        button.addEventListener('click', openFoodSearch);
    });

    const modal = document.getElementById('food-search-modal');
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    function openFoodSearch(event) {
        const mealType = event.target.dataset.meal;
        modal.style.display = 'block';

        const foodSearchInput = document.getElementById('food-search-input');
        const foodSearchResults = document.getElementById('food-search-results');
        
        foodSearchInput.value = '';
        foodSearchResults.innerHTML = '';

        foodSearchInput.addEventListener('input', function() {
            const query = foodSearchInput.value.toLowerCase();
            foodSearchResults.innerHTML = '';

            Object.keys(foodDatabase).forEach(food => {
                if (food.toLowerCase().includes(query)) {
                    const li = document.createElement('li');
                    li.textContent = `${food} - ${foodDatabase[food].calories} kcal`;
                    li.addEventListener('click', () => addFoodToMeal(mealType, food));
                    foodSearchResults.appendChild(li);
                }
            });
        });
    }

    function addFoodToMeal(mealType, food) {
        mealLogs[mealType].push({ name: food, ...foodDatabase[food] });
        updateMealLog(mealType);
        updateMacroTotals();
        modal.style.display = 'none';
    }

    function updateMealLog(mealType) {
        const mealLog = document.getElementById(`${mealType}-log`);
        mealLog.innerHTML = '';

        mealLogs[mealType].forEach(food => {
            const box = document.createElement('div');
            box.className = 'meal-log-box'; // Add a class for styling
            
            const content = `
                <p><strong>${food.name}</strong></p>
                <p>Calories: ${food.calories} kcal</p>
                <p>Carbs: ${food.carbs}g</p>
                <p>Protein: ${food.protein}g</p>
                <p>Fat: ${food.fat}g</p>
            `;
            box.innerHTML = content;
            mealLog.appendChild(box);
        });
    }

    function updateMacroTotals() {
        macroTotals.calories = 0;
        macroTotals.carbs = 0;
        macroTotals.protein = 0;
        macroTotals.fat = 0;

        Object.keys(mealLogs).forEach(mealType => {
            mealLogs[mealType].forEach(food => {
                macroTotals.calories += food.calories;
                macroTotals.carbs += food.carbs;
                macroTotals.protein += food.protein;
                macroTotals.fat += food.fat;
            });
        });

        drawMacroChart();
        drawPieChart();
    }

    function drawMacroChart() {
        const macroChart = document.getElementById('macro-chart');
        macroChart.innerHTML = `<p>Total Calories: ${Math.round(macroTotals.calories)} kcal</p>
            <p>Carbs: ${Math.round(macroTotals.carbs)}g</p>
            <p>Protein: ${Math.round(macroTotals.protein)}g</p>
            <p>Fat: ${Math.round(macroTotals.fat)}g</p>`;
    }

    function drawPieChart() {
        const macroConsumption = document.getElementById('macro-consumption');
        macroConsumption.innerHTML = '<canvas id="nutrition-pie-chart" width="300" height="300"></canvas>';

        const ctx = document.getElementById('nutrition-pie-chart').getContext('2d');
        const totalCalories = macroTotals.calories;

        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Carbs', 'Protein', 'Fat'],
                datasets: [{
                    label: 'Macro Nutrients',
                    data: [
                        (macroTotals.carbs * 4) / totalCalories * 100,
                        (macroTotals.protein * 4) / totalCalories * 100,
                        (macroTotals.fat * 9) / totalCalories * 100
                    ].map(value => Math.round(value)), // Round values to remove decimals
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});
