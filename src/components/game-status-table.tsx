import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { games } from '@/lib/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'

export function GameStatusTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Results</CardTitle>
        <CardDescription>
          Real-time updates on game results and statuses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] sm:w-[200px]">
                Bazar Name
              </TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id} className="h-16">
                <TableCell className="font-medium">{game.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-lg font-bold text-accent">
                      {game.result}
                    </span>
                    {game.status === 'Open' && (
                       <Button size="sm" variant="link" className="h-auto p-0 justify-start w-fit text-primary hover:text-accent">Play Now</Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={game.status === 'Open' ? 'default' : 'destructive'}
                    className={
                      game.status === 'Open'
                        ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800'
                        : ''
                    }
                  >
                    {game.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
