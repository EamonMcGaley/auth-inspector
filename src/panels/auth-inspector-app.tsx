import React, {useEffect, useState} from 'react';
import './auth-inspector-app.css';

interface TableRow {
    url: string, type: string, value: string
}
interface TableRows {
    data: Array<TableRow>;
    setData: React.Dispatch<React.SetStateAction<TableRow[]>>;
}

const TableComponent: React.FC<TableRows> = ({ data, setData }) => {
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const handleCopy = async (value: string) => {
        const copyFrom = document.createElement("textarea");
        copyFrom.textContent = value;
        document.body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.blur();
        document.body.removeChild(copyFrom);
    };

    const handleExpand = (index: number, type: string) => {
        if (type !== 'Bearer') {
            return;
        }
        setExpandedRows(prev => {
            const newExpandedRows = new Set(prev);
            if (newExpandedRows.has(index)) {
                newExpandedRows.delete(index);
            } else {
                newExpandedRows.add(index);
            }
            return newExpandedRows;
        });
    };

    const handleClearData = () => {
        setData([]);
    };

    return (
        <div className="table-container">
            <button onClick={handleClearData}>Clear Data</button>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>URL</th>
                    <th>Type</th>
                    <th>Token</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <React.Fragment key={index}>
                    <tr key={index}>
                        <td onClick={() => handleExpand(index, row.type)} style={{cursor: 'pointer'}}>
                            {expandedRows.has(index) ? 'v' : '>'}
                        </td>
                        <td>{row.url}</td>
                        <td>{row.type}</td>
                        <td onClick={() => handleCopy(row.value)} style={{cursor: 'pointer'}}>{row.value}</td>
                    </tr>
                    {expandedRows.has(index) && (
                        <tr>
                            <td colSpan={4}>
                                <div className="expanded-row-content">
                                    <strong>URL:</strong> {row.url}<br/>
                                    <strong>Type:</strong> {row.type}<br/>
                                    <strong>Header:</strong> <br/>
                                    <pre>{JSON.stringify(JSON.parse(atob(row.value.split('.')[0])), null, 2)}</pre>
                                    <strong>Payload:</strong> <br/>
                                    <pre>{JSON.stringify(JSON.parse(atob(row.value.split('.')[1])), null, 2)}</pre>
                                </div>
                            </td>
                        </tr>
                    )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const AuthInspector: React.FC = () => {
    const [data, setData] = useState<Array<{ url: string, type: string, value: string }>>([]);

    useEffect(() => {
        const handleRequestFinished = (request: any) => {
            request.request.headers.forEach((header: any) => {
                if (header.name === 'Authorization') {
                    setData(prevData => [
                        ...prevData,
                        {
                            url: request.request.url,
                            type: header.value.split(' ')[0],
                            value: header.value.split(' ')[1],
                        }
                    ]);
                }
            });
        };

        chrome.devtools.network.onRequestFinished.addListener(handleRequestFinished);

        return () => {
            chrome.devtools.network.onRequestFinished.removeListener(handleRequestFinished);
        };
    }, []);
    return (
        <div>
            <TableComponent data={data} setData={setData} />
        </div>
    );
};

export default AuthInspector;