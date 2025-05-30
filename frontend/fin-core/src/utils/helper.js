// Este arquivo contém uma coleção de funções utilitárias que auxiliam em diversas tarefas,
// como validação de e-mail, obtenção de iniciais, formatação de números e preparação de dados para gráficos.

import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@.](?:[^\s@.]*[^\s@.])?@[^\s@.](?:[^\s@.]*[^\s@.])?\.[^\s@.]{2,}$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null) return "";

  const numAsNumber = Number(num);
  if (isNaN(numAsNumber)) return "";

  const roundedNumString = numAsNumber.toFixed(2);

  const [integerPart, fractionalPart] = roundedNumString.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!data || data.length === 0) {
    return [];
  }

  const groupedData = data.reduce((acc, item) => {
    const categoryName = item?.category || "Outros";
    if (!acc[categoryName]) {
      acc[categoryName] = { categoryName: categoryName, amount: 0 };
    }
    acc[categoryName].amount += (item?.amount || 0);
    return acc;
  }, {});

  const chartData = Object.values(groupedData).map(item => ({
    ...item,
    amount: parseFloat(item.amount.toFixed(2))
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => {
    const descriptionForLabel = item?.description || item?.source || 'N/A';
    const dateFormatted = moment.utc(item?.date).format('Do MMM YY');

    return {
      displayLabel: descriptionForLabel,
      amount: item?.amount,
      source: item?.source,
      description: item?.description,
      formattedDate: dateFormatted,
    };
  });

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data)) {
    console.error("prepareExpenseLineChartData: os dados de entrada não são um array.", data);
    return [];
  }
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => {
    const dateFormatted = moment.utc(item?.date).format("DD MMM YY");
    return {
      displayDate: dateFormatted,
      amount: parseFloat((item?.amount || 0).toFixed(2)),
      category: item?.category || "N/A",
      description: item?.description || "",
    };
  });
  return chartData;
};