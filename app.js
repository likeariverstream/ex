import {readFile, writeFile, readFileSync} from 'fs'

const maxMin = () => {
    readFile('./max_min_1.txt', {encoding: 'utf-8'}, (err, data) => {
        if (!err) {
            const dataArray = data.split('\n')
            const desc = dataArray
                .map(Number)
                .sort((a, b) => b - a)

            const asc = dataArray
                .map(Number)
                .sort((a, b) => a - b)

            writeFile('./desc.txt', desc.join('\n'), (err) => {
                if (err) {
                    console.warn(err)
                }
            })
            writeFile('./asc.txt', asc.join('\n'), (err) => {
                if (err) {
                    console.warn(err)
                }
            })
        }
    })
}

maxMin()

const sort = () => {
    readFile('sort1.txt', {encoding: 'utf-8'}, (err, data) => {
        if (!err) {
            const dataArray = data.split('\n')
            const desc = dataArray.map(Number).sort((a, b) => b - a)
            writeFile('desc_sort1.txt', desc.join('\n'), {encoding: 'utf-8'}, (err) => {
                if (err) {
                    console.warn(err)
                }
            })
        }
    })
}

sort()

const rungeKutta = () => {
    const n = 100;

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

const sumRecur = () => {
    const numbers = readFileSync('sum_recur_rd_1.txt', 'utf8').split('\n').map(Number);
    let s = [0, 0, 5]; // initial values S(0), S(1) и S(2)

    for (let k = 3; k <= 100; k++) {
        s[k] = s[k - 1] + 2 * numbers[k] + numbers[k - 1];
    }

    console.log(`S(100): ${s[100]}`)
}

sumRecur()

const calculateMatrix = () => {

    const matrixFile = readFileSync('A1.txt', 'utf8')
    const vectorFile = readFileSync('B1.txt', 'utf8')
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
    console.log(`x[25] = ${x[25].toFixed(2)}`);
    console.log(`x[35] = ${x[35].toFixed(2)}`);
    console.log(`x[55] = ${x[55].toFixed(2)}`);
}

calculateMatrix()

const rectIntegral = () => {
    function f(x) {
        return Math.cos(x + Math.exp(x)) ** 2;
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
    const b = 6;
    const n = 1000000; // Увеличиваем число разбиений для большей точности
    const result = rect(a, b, n);

    console.log(`Интеграл одним из способов: ${result.toFixed(2)}`); // Выводим результат с точностью до двух десятых

}

rectIntegral()

const sum = () => {
    let sum = 0;
    for (let k = 5; k <= 50; k++) {
        const a = (-1) ** k * (9 / 8) ** k;
        const b = (6 / 5) ** k;
        sum += a + b;
    }
    console.log(`Сумма ряда: ${sum}`);
}

sum()

const newton = () => {
    const EPSILON = 1e-5; // Заданная точность
    const MAX_ITERATIONS = 100; // Максимальное количество итераций
    const a = 1; // Левая граница интервала
    const b = 2; // Правая граница интервала

// Функция, значение которой мы ищем
    function f(x) {
        return x * Math.sin(x ** 2 + 1);
    }

// Производная функции f(x)
    function df(x) {
        return Math.sin(x ** 2 + 1) + 2 * x ** 2 * Math.cos(x ** 2 + 1);
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
        console.log(`Нелинейное уравнение методом Ньютона x = ${solution.toFixed(3)}`);
    }
}

newton()