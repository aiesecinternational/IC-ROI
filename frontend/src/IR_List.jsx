const entities = [
    { id: '572', name: 'Afghanistan' },
    { id: '133', name: 'Albania' },
    { id: '457', name: 'Algeria' },
    { id: '2249', name: 'Andorra' },
    { id: '1535', name: 'Argentina' },
    { id: '1541', name: 'Armenia' },
    { id: '1591', name: 'Australia' },
    { id: '1592', name: 'Austria' },
    { id: '539', name: 'Azerbaijan' },
    { id: '518', name: 'Bahrain' },
    { id: '2010', name: 'Bangladesh' },
    { id: '1624', name: 'Belgium' },
    { id: '459', name: 'Benin' },
    { id: '2104', name: 'Bhutan' },
    { id: '1593', name: 'Bolivia' },
    { id: '1590', name: 'Bosnia and Herzegovina' },
    { id: '1584', name: 'Botswana' },
    { id: '1606', name: 'Brazil' },
    { id: '1588', name: 'Bulgaria' },
    { id: '180', name: 'Burkina Faso' },
    { id: '305', name: 'Cambodia' },
    { id: '1581', name: 'Cameroon' },
    { id: '1554', name: 'Canada' },
    { id: '1566', name: 'Chile' },
    { id: '1551', name: 'Colombia' },
    { id: '577', name: 'Costa Rica' },
    { id: '1537', name: "Cote D'Ivoire" },
    { id: '1595', name: 'Croatia' },
    { id: '2109', name: 'Cyprus' },
    { id: '1570', name: 'Czech Republic' },
    { id: '1577', name: 'Denmark' },
    { id: '1599', name: 'Dominican Republic' },
    { id: '1567', name: 'Ecuador' },
    { id: '1609', name: 'Egypt' },
    { id: '1572', name: 'El Salvador' },
    { id: '1565', name: 'Estonia' },
    { id: '476', name: 'Ethiopia' },
    { id: '2240', name: 'Fiji' },
    { id: '1620', name: 'Finland' },
    { id: '1597', name: 'France' },
    { id: '499', name: 'Gabon' },
    { id: '531', name: 'Georgia' },
    { id: '1596', name: 'Germany' },
    { id: '1568', name: 'Ghana' },
    { id: '1555', name: 'Greece' },
    { id: '1556', name: 'Guatemala' },
    { id: '2339', name: 'Haiti' },
    { id: '2108', name: 'Honduras' },
    { id: '1594', name: 'Hong Kong' },
    { id: '1549', name: 'Hungary' },
    { id: '1550', name: 'Iceland' },
    { id: '1585', name: 'India' },
    { id: '1539', name: 'Indonesia' },
    { id: '495', name: 'Iran' },
    { id: '1540', name: 'Ireland' },
    { id: '1542', name: 'Italy' },
    { id: '2427', name: 'Jamaica' },
    { id: '1615', name: 'Japan' },
    { id: '530', name: 'Jordan' },
    { id: '494', name: 'Kazakhstan' },
    { id: '1617', name: 'Kenya' },
    { id: '2106', name: 'Kingdom of Saudi Arabia' },
    { id: '543', name: 'Kyrgyzstan' },
    { id: '1579', name: 'Latvia' },
    { id: '182', name: 'Lebanon' },
    { id: '219', name: 'Liberia' },
    { id: '2121', name: 'Liechtenstein' },
    { id: '1580', name: 'Lithuania' },
    { id: '1548', name: 'Macedonia' },
    { id: '2428', name: 'Madagascar' },
    { id: '1613', name: 'Mainland of China' },
    { id: '1709', name: 'Malawi' },
    { id: '1611', name: 'Malaysia' },
    { id: '2105', name: 'Maldives' },
    { id: '2442', name: 'Mali' },
    { id: '1612', name: 'Malta' },
    { id: '489', name: 'Mauritius' },
    { id: '1589', name: 'Mexico' },
    { id: '536', name: 'Moldova' },
    { id: '2103', name: 'Monaco' },
    { id: '409', name: 'Mongolia' },
    { id: '1552', name: 'Morocco' },
    { id: '1574', name: 'Mozambique' },
    { id: '112', name: 'Nepal' },
    { id: '1616', name: 'New Zealand' },
    { id: '178', name: 'Nicaragua' },
    { id: '2117', name: 'Niger' },
    { id: '1578', name: 'Nigeria' },
    { id: '1573', name: 'Norway' },
    { id: '1603', name: 'Pakistan' },
    { id: '1582', name: 'Panama' },
    { id: '177', name: 'Paraguay' },
    { id: '1553', name: 'Peru' },
    { id: '1604', name: 'Philippines' },
    { id: '1564', name: 'Poland' },
    { id: '1544', name: 'Portugal' },
    { id: '1538', name: 'Puerto Rico' },
    { id: '529', name: 'Qatar' },
    { id: '1560', name: 'Romania' },
    { id: '1618', name: 'Russia' },
    { id: '506', name: 'Rwanda' },
    { id: '1605', name: 'Senegal' },
    { id: '1547', name: 'Serbia' },
    { id: '1840', name: 'Seychelles' },
    { id: '2420', name: 'Sierra Leone' },
    { id: '1575', name: 'Singapore' },
    { id: '1536', name: 'Slovakia' },
    { id: '1587', name: 'Slovenia' },
    { id: '1545', name: 'South Africa' },
    { id: '1619', name: 'Spain' },
    { id: '1623', name: 'Sri Lanka' },
    { id: '2418', name: 'Swaziland' },
    { id: '1601', name: 'Sweden' },
    { id: '1558', name: 'Switzerland' },
    { id: '1561', name: 'Taiwan' },
    { id: '537', name: 'Tajikistan' },
    { id: '567', name: 'Tanzania' },
    { id: '1607', name: 'Thailand' },
    { id: '1598', name: 'The Netherlands' },
    { id: '1543', name: 'Togo' },
    { id: '1559', name: 'Tunisia' },
    { id: '1622', name: 'Turkey' },
    { id: '1602', name: 'Uganda' },
    { id: '1610', name: 'Ukraine' },
    { id: '1625', name: 'United Arab Emirates' },
    { id: '1563', name: 'United Kingdom' },
    { id: '1621', name: 'United States' },
    { id: '1614', name: 'Uruguay' },
    { id: '2115', name: 'Uzbekistan' },
    { id: '1557', name: 'Venezuela' },
    { id: '504', name: 'VIETNAM' },
    { id: '2122', name: 'Zambia' },
    { id: '2417', name: 'Zimbabwe' }
  ];

  export default entities;