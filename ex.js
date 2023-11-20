import {readFile, writeFile, readFileSync} from 'fs'

const diff = () => {
    function f(x, y) {
        return (Math.sqrt(Math.cos(x + 1) * Math.log(x - 1)) - 1)
    }

    function euler(a, b, h, y0) {
        const n = Math.floor((b - a) / h) + 1;
        const y = [y0];
        for (let i = 1; i < n; i++) {
            const x = a + (i - 1) * h;
            y[i] = y[i - 1] + h * f(x, y[i - 1]);
        }
        return y;
    }

    const a = 1;
    const b = 1.5;
    const h = 1e-5;
    const y0 = 0;

    const y = euler(a, b, h, y0);

    let solution = 0;
    for (let i = 0; i < y.length; i++) {
        if (y[i] >= 1 && y[i] <= 2) {
            solution = y[i];
            break;
        }
    }
    console.log(`Task 1 diff: ${solution.toFixed(3)}`);

}

diff()

const calculateMatrix = () => {

    const matrixFile = readFileSync('A11.txt', 'utf8')
    const vectorFile = readFileSync('B11.txt', 'utf8')
    const matrix = matrixFile.trim().split('\n').map(row => row.split('\t').map(Number));
    const vector = vectorFile.trim().split('\n').map(Number);

// Инициализация массивов
    const n = vector.length;
    const a = new Array(n);
    const b = new Array(n);
    const c = new Array(n);
    const x = new Array(n);

// Вычисление коэффициентов a, b, c
    for (let i = 0; i < n; i++) {
        b[i] = matrix[i][i];
        x[i] = vector[i];
        if (i > 0) {
            a[i] = matrix[i][i - 1];
        }
        if (i < n - 1) {
            c[i] = matrix[i][i + 1];
        }
    }

// Вычисление коэффициентов alpha и beta для первого уравнения
    const alpha = new Array(n);
    const beta = new Array(n);
    alpha[1] = -c[0] / b[0];
    beta[1] = x[0] / b[0];

// Вычисление коэффициентов x для первого уравнения
    for (let i = 1; i < n - 1; i++) {
        const m = b[i] + a[i] * alpha[i];
        alpha[i + 1] = -c[i] / m;
        beta[i + 1] = (x[i] - a[i] * beta[i]) / m;
    }

// Вычисление коэффициентов x для остальных уравнений
    x[n - 1] = (x[n - 1] - a[n - 1] * beta[n - 1]) / (b[n - 1] + a[n - 1] * alpha[n - 1]);
    for (let i = n - 2; i >= 0; i--) {
        x[i] = alpha[i + 1] * x[i + 1] + beta[i + 1];
    }

// Вывод результата
    console.log(`x[6] = ${x[6].toFixed(2)}`);
    console.log(`x[27] = ${x[27].toFixed(2)}`);
    console.log(`x[38] = ${x[38].toFixed(2)}`);
}

calculateMatrix()

const rungeKutta = () => {
    const n = 800;

    const f = (x, y) => {
        return 0.5 + 0.5 * x + Math.cos(x) + Math.sin(x) - y;
    }

    const ya = (x) => {
        return 0.5 * x + Math.sin(x);
    }
    const a = 0;
    const b = 1;
    const h = (b - a) / (n - 1);
    const y = new Array(n).fill(0);

    for (let k = 0; k < n - 1; k++) {
        const x = k * h;
        const m1 = h * f(x, y[k]);
        const m2 = h * f(x + h / 2, y[k] + m1 / 2);
        const m3 = h * f(x + h / 2, y[k] + m2 / 2);
        const m4 = h * f(x + h, y[k] + m3);
        y[k + 1] = y[k] + (m1 + 2 * m2 + 2 * m3 + m4) / 6;

        console.log(`x = ${x.toFixed(2)} \t\t y = ${y[k].toFixed(2)}`);
    }

    console.log(`x = ${b.toFixed(2)} \t\t y = ${y[n - 1].toFixed(2)}`);
}

rungeKutta()

const sort = () => {
    readFile('sort13.txt', {encoding: 'utf-8'}, (err, data) => {
        if (!err) {
            const dataArray = data.split('\n')
            const asc = dataArray.map(Number).sort((a, b) => a - b)
            writeFile('asc_sort13.txt', asc.join('\n'), {encoding: 'utf-8'}, (err) => {
                if (err) {
                    console.warn(err)
                }
            })
        }
    })
}

sort()

const rectIntegral = () => {
    function f(x) {
        return (Math.sqrt(x ** 2 - 3) / (x ** 2 + 5 * x + Math.sin(x)))
    }

    function rect(a, b, n) {
        const h = (b - a) / n;
        let s = 0;
        for (let i = 0; i < n; i++) {
            const x = a + (i + 0.5) * h;
            s += f(x);
        }
        return s * h;
    }

    const a = 2;
    const b = 5;
    const n = 1000000; // Увеличиваем число разбиений для большей точности
    const result = rect(a, b, n);

    console.log(`Интеграл: ${result.toFixed(2)}`); // Выводим результат с точностью до двух десятых

}

rectIntegral()

const maxMin = () => {
    readFile('./max_min_3.txt', {encoding: 'utf-8'}, (err, data) => {
        if (!err) {
            const dataArray = data.split('\n')
            const desc = dataArray
                .map(Number)
                .sort((a, b) => b - a)

            const asc = dataArray
                .map(Number)
                .sort((a, b) => a - b)

            writeFile('./desc_3.txt', desc.join('\n'), (err) => {
                if (err) {
                    console.warn(err)
                }
            })
            writeFile('./asc_3.txt', asc.join('\n'), (err) => {
                if (err) {
                    console.warn(err)
                }
            })
        }
    })
}

maxMin()

const sum = () => {
    let sum = 0;
    for (let k = 10; k <= 50; k++) {
        const a = (-1) ** k * (9 / 7) ** (k + 1);
        const b = (4 / 3) ** k;
        sum += a + b;
    }
    console.log(`Сумма ряда: ${sum.toFixed()}`);
}

sum()

const sumRecur = () => {
    const numbers = readFileSync('sum_recur_rd_18.txt', 'utf8').split('\n').map(Number);
    let s = [0, 0, 0]; // initial values S(0), S(1) и S(2)
    s[799] = 0
    for (let k = 800; k <= 930; k++) {
        s[k] = s[k - 1] + numbers[k - 1] + numbers[k];
    }

    console.log(`S(800): ${s[800]}`)
}

sumRecur()

const newton = () => {
    const EPSILON = 1e-5; // Заданная точность
    const MAX_ITERATIONS = 100; // Максимальное количество итераций
    const a = 1; // Левая граница интервала
    const b = 1.5; // Правая граница интервала

// Функция, значение которой мы ищем
    function f(x) {
       return (Math.sqrt(Math.cos(x + 1) * Math.log(x - 1)) - 1) === 1
    }

// Производная функции f(x)
    function df(x) {
        return -(Math.sin(x + 1) * Math.log(x - 1) + Math.cos(x + 1) / (x - 1)) / (2 * Math.sqrt(Math.cos(x + 1) * Math.log(x - 1)))


    }

// Функция, реализующая метод Ньютона
    function newtonMethod(a, b) {
        let x0 = (a + b) / 2; // Начальное приближение
        let x1 = x0 - f(x0) / df(x0); // Первое приближение

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            if (Math.abs(x1 - x0) < EPSILON) {
                return x1;
            }

            x0 = x1;
            x1 = x0 - f(x0) / df(x0);
        }

        return null; // Решение не найдено
    }

// Вызов функции, решающей уравнение
    const solution = newtonMethod(a, b);

    if (solution === null) {
        console.log('Решение не найдено');
    } else {
        console.log(`x = ${solution.toFixed(3)}`);
    }
}

newton()